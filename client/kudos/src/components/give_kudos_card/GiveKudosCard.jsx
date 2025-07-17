import React from "react";
import { useNavigate } from "react-router-dom";
import "./GiveKudosCard.css";

const GiveKudosCard = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/kudos/create"); // Navigate to the Create Kudos page
    };

    return (
        <div className="give-kudos-card" onClick={handleClick}>
            <div className="give-kudos-emoji">👏</div>
            <div className="give-kudos-title">Give Kudos!</div>
            <div className="give-kudos-text">
                Motivate your peers and celebrate their achievements.<br />
                Click here to send a Kudos and make someone's day brighter!
            </div>
            <button className="give-kudos-btn">Give Kudos Now</button>
        </div>
    );
};

export default GiveKudosCard;