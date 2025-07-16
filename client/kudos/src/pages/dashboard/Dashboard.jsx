import React from "react";
import './Dashboard.css';
import KudosCarousel from "./KudosCarousel";
import WeeklyKudosCard from "./WeeklyKudosCard";
import GiveKudosCard from "./GiveKudosCard";
import AllKudosLink from "./AllKudosLink";

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-top">
                <div className="dashboard-left">
                    <KudosCarousel />
                </div>
                <div className="dashboard-right">
                    <WeeklyKudosCard />
                    <GiveKudosCard />
                </div>
            </div>
            <div className="dashboard-bottom">
                <AllKudosLink />
            </div>
        </div>
    );
};

export default Dashboard;