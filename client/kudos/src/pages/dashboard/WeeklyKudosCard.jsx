import React from "react";
import "./Dashboard.css";

const WeeklyKudosCard = () => (
    <div className="weekly-kudos-card">
        <h3>Give your Kudos for this week!</h3>
        <p>You have <span className="pending-kudos">3</span> pending kudos to give.</p>
        <p className="deadline">Deadline: <b>Sunday, 11:59 PM</b></p>
    </div>
);

export default WeeklyKudosCard;