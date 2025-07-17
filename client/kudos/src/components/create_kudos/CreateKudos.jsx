import React, { useState, useContext } from "react";
import { UserContext } from "../../store/UserContext";
import useApiQuery from "../../hooks/useApiQuery";
import "./CreateKudos.css";
import { API_ENDPOINTS } from "../../constants";
const CreateKudos = () => {
    const { user } = useContext(UserContext);
    const { callApi } = useApiQuery();
    const [form, setForm] = useState({
        receiver: "",
        level: "",
        behaviour: "",
        message: "",
        points: 1,
        kudos_assignment: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!form.receiver || !form.level || !form.behaviour || !form.message || !form.points) {
            setError("Please fill all required fields.");
            return;
        }
        const { data, error: apiError } = await callApi({
            url: API_ENDPOINTS.KUDOS(user.organization),
            method: "POST",
            body: {
                ...form,
                sender: user.id,
                organization: user.organization,
            },
        });
        if (data && data.id) {
            setSuccess("Kudos sent successfully!");
            setForm({
                receiver: "",
                level: "",
                behaviour: "",
                message: "",
                points: 1,
                kudos_assignment: "",
            });
        } else {
            setError(apiError?.detail || "Failed to send kudos.");
        }
    };

    return (
        <div className="create-kudos-container">
            <h2>Give Kudos</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form className="create-kudos-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="receiver">Receiver (User ID)<span style={{color: "#d32f2f"}}>*</span></label>
                    <input
                        type="text"
                        id="receiver"
                        name="receiver"
                        value={form.receiver}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Enter receiver user ID"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="level">Level<span style={{color: "#d32f2f"}}>*</span></label>
                    <input
                        type="text"
                        id="level"
                        name="level"
                        value={form.level}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="behaviour">Behaviour<span style={{color: "#d32f2f"}}>*</span></label>
                    <input
                        type="text"
                        id="behaviour"
                        name="behaviour"
                        value={form.behaviour}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message<span style={{color: "#d32f2f"}}>*</span></label>
                    <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={3}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="points">Points<span style={{color: "#d32f2f"}}>*</span></label>
                    <input
                        type="number"
                        id="points"
                        name="points"
                        value={form.points}
                        min={1}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Give Kudos
                </button>
            </form>
        </div>
    );
};

export default CreateKudos;