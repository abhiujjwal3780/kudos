import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { API_ENDPOINTS } from "../../constants";
import useApiQuery from "../../hooks/useApiQuery";
import { UserContext } from "../../store/UserContext";

const Login = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { loading, callApi } = useApiQuery();
    const { setUser } = useContext(UserContext);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        // 1. Login and get tokens
        const { data, error: apiError } = await callApi({
            url: API_ENDPOINTS.LOGIN,
            method: "POST",
            body: form,
        });
        if (data && data.access) {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);

            // 2. Fetch user details using the access token
            const { data: userData, error: userError } = await callApi({
                url: API_ENDPOINTS.ME,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${data.access}`,
                },
            });

            if (userData) {
                setUser(userData); // 3. Save to context
                navigate("/dashboard"); // 4. Redirect
            } else {
                setError(userError?.detail || "Failed to fetch user details");
            }
        } else {
            setError(apiError?.detail || "Invalid username or password");
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <div className="error-message">{error}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;