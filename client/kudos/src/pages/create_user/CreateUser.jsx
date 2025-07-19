import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { API_ENDPOINTS } from "../../constants";
import useApiQuery from "../../hooks/useApiQuery";
import './CreateUser.css';
import { UserContext } from "../../store/UserContext";
import { useContext } from "react";
const CreateUser = () => {
    const { user } = useContext(UserContext);
    const [form, setForm] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        manager: "",
        organization: user?.organization, // Use the organization from the context
        is_active: true,
        is_staff: false,
        is_superuser: false,
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { loading, callApi } = useApiQuery();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        // Validate required fields (except first_name, last_name)
        if (
            !form.username.trim() ||
            !form.email.trim() ||
            !form.password.trim() ||
            !form.manager.trim()
        ) {
            setError("Please fill all required fields.");
            return;
        }
        const { data, error: apiError } = await callApi({
            url: API_ENDPOINTS.USERS(user.organization),
            method: "POST",
            body: form,
        });
        if (data && data.id) {
            setSuccess("User created successfully!");
            setForm({
                username: "",
                email: "",
                first_name: "",
                last_name: "",
                password: "",
                manager: "",
                is_active: true,
                is_staff: false,
                is_superuser: false,
            });
        } else {
            setError(apiError?.detail || "Failed to create user");
        }
    };

    return (
        <div className="login-container">
            <h1>Create User</h1>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username<span style={{color: "#d32f2f"}}>*</span></label>
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
                    <label htmlFor="email">Email<span style={{color: "#d32f2f"}}>*</span></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password<span style={{color: "#d32f2f"}}>*</span></label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="org">Organization (Org Id)<span style={{color: "#d32f2f"}}>*</span></label>
                    <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={form.organization}
                        onChange={handleChange}
                        required
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="manager">Manager (User ID)</label>
                    <input
                        type="text"
                        id="manager"
                        name="manager"
                        value={form.manager}
                        onChange={handleChange}
                        
                    />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="is_active"
                            checked={form.is_active}
                            onChange={handleChange}
                        />
                        {" "}Is Active
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="is_staff"
                            checked={form.is_staff}
                            onChange={handleChange}
                        />
                        {" "}Is Staff
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="is_superuser"
                            checked={form.is_superuser}
                            onChange={handleChange}
                        />
                        {" "}Is Superuser
                    </label>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    );
};

export default CreateUser;