import React, { useEffect, useState, useContext } from "react";
import './Dashboard.css';
import KudosCard from "../../../components/kudos_card/KudosCard";
import { API_ENDPOINTS } from "../../../constants";
import useApiQuery from "../../../hooks/useApiQuery";
import { UserContext } from "../../../store/UserContext";
import KudosAssignInfo from "../../../components/kudos_assignment/KudosAssignInfo";
import GiveKudosCard from "../../../components/give_kudos_card/GiveKudosCard";

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [kudosList, setKudosList] = useState([]);
    const { callApi } = useApiQuery();

    useEffect(() => {
        const fetchKudos = async () => {
            if (!user?.organization) return;
            const { data } = await callApi({
                url: API_ENDPOINTS.KUDOS(user.organization),
                method: "GET",
            });
            if (Array.isArray(data)) setKudosList(data);
        };
        fetchKudos();
        // eslint-disable-next-line
    }, [user]);

    return (
        <div className="dashboard-container">
            <div className="dashboard-top">
                <div className="dashboard-left">
                    <GiveKudosCard />
                </div>
                <div className="dashboard-right">
                    <div className="">
                        <KudosAssignInfo />
                    </div>
                </div>
            </div>
            <div className="dashboard-bottom">
                <div className="title"> 
                    kudos for your organization
                </div>
                <div className="kudos-container">
                    {kudosList.length === 0 ? (
                        <div className="no-kudos-msg">No kudos found for your organization.</div>
                    ) : (
                        kudosList.map(kudo => (
                            <KudosCard
                                key={kudo.id}
                                sender={kudo.sender_name || kudo.sender} // adjust field as per your API
                                receiver={kudo.receiver_name || kudo.receiver}
                                level={kudo.level}
                                behaviour={kudo.behaviour}
                                message={kudo.message}
                                points={kudo.points}
                                created_at={kudo.created_at}
                                kudos_assignment={kudo.kudos_assignment}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
