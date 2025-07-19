import React, { useState, useContext } from "react";
import { UserContext } from "../../store/UserContext";
import useApiQuery from "../../hooks/useApiQuery";
import "./CreateKudosAssignment.css";
import { API_ENDPOINTS } from "../../constants";
const CreateKudosAssignment = () => {
    const { user } = useContext(UserContext);
    const { callApi } = useApiQuery();
    const [form, setForm] = useState({
        sender: "",
        receiver: "",
        assignment_start_date: "",
        assignment_end_date: "",
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
        
        if (!form.sender  || !form.receiver || !form.assignment_start_date || !form.assignment_end_date) {
            setError("Please fill all required fields.");
            return;
        }
        if (form.sender  == form.receiver ) {
            setError("Sender and receiver can't be same");
            return;
        }
        const { data, error: apiError } = await callApi({
            url: API_ENDPOINTS.KUDOS_ASSIGNMENTS(user.organization),
            method: "POST",
            body: {
                ...form,
                organization: user.organization,
            },
        });
        if (data && data.id) {
            setSuccess("Kudos assignment created successfully!");
            setForm({
                sender: "",
                receiver: "",
                assignment_start_date: "",
                assignment_end_date: "",
            });
        } else {
            setError(apiError?.detail || "Failed to create kudos assignment.");
        }
    };

    return (
        <div className="create-kudos-assignment-container">
            <h2>Create Kudos Assignment</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form className="create-kudos-assignment-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="sender">Sender (User ID)<span style={{color: "#d32f2f"}}>*</span></label>
                    <input
                        type="text"
                        id="sender"
                        name="sender"
                        value={form.sender}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Enter sender user ID"
                        required
                    />
                </div>
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
                    <label htmlFor="assignment_start_date">Assignment Start Date<span style={{color: "#d32f2f"}}>*</span></label>
                    <input
                        type="date"
                        id="assignment_start_date"
                        name="assignment_start_date"
                        value={form.assignment_start_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="assignment_end_date">Assignment End Date<span style={{color: "#d32f2f"}}>*</span></label>
                    <input
                        type="date"
                        id="assignment_end_date"
                        name="assignment_end_date"
                        value={form.assignment_end_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Assignment
                </button>
            </form>
        </div>
    );
};

export default CreateKudosAssignment;