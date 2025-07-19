import { useState, useCallback, useRef } from 'react';

const useApiQuery = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);

  const callApi = useCallback(async ({
    url,
    method = 'GET',
    body = null,
    headers = {},
    params = null,
    token = null,
  }) => {
    setLoading(true);
    setError(null);
    setData(null);

    let fetchUrl = url;
    if (params && typeof params === 'object') {
      const query = new URLSearchParams(params).toString();
      fetchUrl += (fetchUrl.includes('?') ? '&' : '?') + query;
    }

    abortControllerRef.current = new AbortController();

    const fetchHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };
    if (token) {
      fetchHeaders['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(fetchUrl, {
        method,
        headers: fetchHeaders,
        body: body ? JSON.stringify(body) : null,
        signal: abortControllerRef.current.signal,
      });

      const contentType = response.headers.get('content-type');
      let responseData;
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      // Handle new response structure
      if (typeof responseData === 'object' && responseData !== null) {
        if (responseData.success) {
          setData(responseData.data);
          setError(null);
          return { data: responseData.data, error: null, message: responseData.message };
        } else {
          setError(responseData.errors || responseData.message || response.statusText);
          setData(null);
          return { data: null, error: responseData.errors || responseData.message || response.statusText, message: responseData.message };
        }
      } else {
        if (!response.ok) {
          setError(responseData || response.statusText);
          setData(null);
        } else {
          setData(responseData);
          setError(null);
        }
        return { data: responseData, error: !response.ok ? responseData : null };
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request was aborted');
      } else {
        setError(err.message || 'Something went wrong');
      }
      setData(null);
      return { data: null, error: err.message || 'Something went wrong' };
    } finally {
      setLoading(false);
    }
  }, []);

  const abort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return { data, error, loading, callApi, abort };
};

export default useApiQuery;