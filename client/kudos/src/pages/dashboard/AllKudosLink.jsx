import React from "react";
import "./Dashboard.css";

const AllKudosLink = () => (
    <div className="all-kudos-link">
        <img alt="All Kudos Table" className="kudos-table-img" />
        <a href="/organization/kudos" className="all-kudos-btn">View All Kudos</a>
        <p className="all-kudos-desc">See all kudos in your organization, filter and explore!</p>
    </div>
);

export default AllKudosLink;