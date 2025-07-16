import React, { useState } from "react";
import { API_ENDPOINTS } from "../../constants";
import useApiQuery from "../../hooks/useApiQuery";
import './CreateOrg.css';

const CreateOrg = () => {
    const [form, setForm] = useState({ name: "", description: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { loading, callApi } = useApiQuery();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        const { data, error: apiError } = await callApi({
            url: API_ENDPOINTS.ORGANIZATIONS,
            method: "POST",
            body: form,
        });
        if (data && data.id) {
            setSuccess("Organization created successfully!");
            setForm({ name: "", description: "" });
        } else {
            setError(apiError?.detail || "Failed to create organization");
        }
    };

    return (
        <div className="login-container">
            <h1>Create Organization</h1>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Organization Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    );
};

export default CreateOrg;