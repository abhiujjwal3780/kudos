import React, { useEffect, useState, useContext } from "react";
import "./KudosAssignInfo.css";
import { API_ENDPOINTS } from "../../constants";
import useApiQuery from "../../hooks/useApiQuery";
import { UserContext } from "../../store/UserContext";

const statusColors = {
    pending: "#ff9800",
    completed: "#388e3c",
    cancelled: "#d32f2f"
};

const KudosAssignInfo = ({ periodLabel = "This Week" }) => {
    const { user } = useContext(UserContext);
    const { callApi } = useApiQuery();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssignments = async () => {
            if (!user?.organization || !user?.id) return;
            setLoading(true);
            const { data } = await callApi({
                url: API_ENDPOINTS.KUDOS_ASSIGNMENTS(user.organization),
                method: "GET",
                params: { sender: user.id }, // If your API supports filtering by sender
            });
            if (Array.isArray(data)) setAssignments(data.filter(a => a.sender === user.id));
            setLoading(false);
        };
        fetchAssignments();
        // eslint-disable-next-line
    }, [user]);

    return (
        <div className="kudos-assign-info-card">
            <h2>Kudos Assignments <span className="period-label">({periodLabel})</span></h2>
            {loading ? (
                <div className="no-assignments">Loading...</div>
            ) : assignments.length === 0 ? (
                <div className="no-assignments">No assignments for this period.</div>
            ) : (
                <div className="assignments-list">
                    {assignments.map(a => (
                        <div className="assignment-row" key={a.id}>
                            <div className="assignment-status" style={{background: statusColors[a.status] || "#bdbdbd"}}>
                                {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                            </div>
                            <div className="assignment-info">
                                <div>
                                    <span className="assignment-label">To:</span> <b>{a.receiver_name || a.receiver}</b>
                                </div>
                                <div>
                                    <span className="assignment-label">Period:</span> {a.assignment_start_date} --- {a.assignment_end_date}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default KudosAssignInfo;