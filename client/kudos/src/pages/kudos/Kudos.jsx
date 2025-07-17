import React, { useState } from "react";
import Navbar from "../../common_components/navbar/NavBar";
import Dashboard from "./dashboard/Dashboard";
// import ShowAllKudos from "../show_all_kudos/ShowAllKudos";
// import MyKudos from "../my_kudos/MyKudos";
// import AssignKudos from "../assign_kudos/AssignKudos";
import { useNavigate } from "react-router-dom";

import { kudosNavItems } from "../../config";
import CreateKudos from "../../components/create_kudos/CreateKudos";
import CreateKudosAssignment from "../../components/create_kudos_assignment/CreateKudosAssignment";
import ShowAllKudos from "../show_all_kudos/ShowAllKudos";

const componentMap = {
    dashboard: <Dashboard />,
    create: <CreateKudos />,
    allkudos: <ShowAllKudos />,
    assignkudos: <CreateKudosAssignment />,
};

const Kudos = () => {
    const [selected, setSelected] = useState("dashboard");
    const navigate = useNavigate();

    return (
        <div>
            <Navbar
                navItems={kudosNavItems.map(item => ({
                    key: item.key,
                    label: item.label,
                    url: item.path,
                    onClick: () => {
                        setSelected(item.key);
                        navigate(item.path); // This updates the URL
                    },
                    active: selected === item.key,
                }))}
            />
            <div>
                {componentMap[selected]}
            </div>
        </div>
    );
};

export default Kudos;