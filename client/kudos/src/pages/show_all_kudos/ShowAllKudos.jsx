import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../store/UserContext";
import useApiQuery from "../../hooks/useApiQuery";
import CommonTable from "../../components/common/CommonTable";
import KudosFilter from "../../components/kudos/KudosFilter";
import { API_ENDPOINTS } from "../../constants";
import "./ShowAllKudos.css";
const columns = [
    { key: "id", label: "ID" },
    { key: "sender", label: "Sender" },
    { key: "receiver", label: "Receiver" },
    { key: "level", label: "Level" },
    { key: "behaviour", label: "Behaviour" },
    { key: "message", label: "Message" },
    { key: "points", label: "Points" },
    { key: "created_at", label: "Date" },
];

const ShowAllKudos = () => {
    const { user } = useContext(UserContext);
    const { callApi } = useApiQuery();
    const [kudos, setKudos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [myKudos, setMyKudos] = useState(false);

    const fetchKudos = async (filters = {}) => {
        setLoading(true);
        const params = { ...filters };
        if (myKudos) {
            params.receiver = user.id;
        }
        const { data } = await callApi({
            url: API_ENDPOINTS.KUDOS(user.organization),
            method: "GET",
            params,
        });
        setKudos(Array.isArray(data) ? data : []);
        setLoading(false);
    };

    useEffect(() => {
        fetchKudos();
        // eslint-disable-next-line
    }, [myKudos, user.organization]);

    const handleToggle = () => {
        setMyKudos((prev) => !prev);
    };

    return (
        <div>
            <h2>Kudos</h2>
            <div>
                <button
                    className={`toggle-btn ${myKudos ? "btn-primary" : "btn-secondary"}`}
                    onClick={handleToggle}
                >
                    {myKudos ? "Show All Kudos" : "Show My Kudos"}
                </button>
            </div>
            <KudosFilter
                onFilter={fetchKudos}
                // Optionally, you can pass mode and userId to hide receiver filter when myKudos is true
                mode={myKudos ? "mykudos" : "all"}
                userId={user.id}
            />
            {loading ? (
                <div style={{ textAlign: "center", margin: "2rem" }}>Loading...</div>
            ) : (
                <CommonTable columns={columns} data={kudos} />
            )}
        </div>
    );
};

export default ShowAllKudos;