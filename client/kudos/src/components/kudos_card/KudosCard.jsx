import React from "react";
import "./KudosCard.css";

const KudosCard = ({
    sender,
    receiver,
    level,
    behaviour,
    message,
    points,
    created_at,
    kudos_assignment,
}) => {
    return (
        <div className="kudos-card">
            <div className="kudos-card-header">
                <div className="kudos-sender">
                    <span role="img" aria-label="sender">🙌</span> {sender.email}
                </div>
                <div className="kudos-points">
                    <span className="points-badge">{points} ⭐</span>
                </div>
            </div>
            <div className="kudos-card-body">
                <div className="kudos-receiver">
                    <span role="img" aria-label="receiver">🎉</span> To: <b>{receiver.email}</b>
                </div>
                <div className="kudos-level-behaviour">
                    <span className="level">{level}</span>
                    {level && behaviour && <span className="dot-sep">•</span>}
                    <span className="behaviour">{behaviour}</span>
                </div>
                <div className="kudos-message">
                    "{message}"
                </div>
            </div>
            <div className="kudos-card-footer">
                <span className="kudos-date">
                    {new Date(created_at).toLocaleString()}
                </span>
                {kudos_assignment && (
                    <span className="kudos-assignment">
                        Assignment: {kudos_assignment}
                    </span>
                )}
            </div>
        </div>
    );
};

export default KudosCard;