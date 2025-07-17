import React, { useState } from "react";
import "./KudosFilter.css";

const initialFilters = {
    sender: "",
    receiver: "",
    level: "",
    behaviour: "",
    points: "",
    created_at: "",
};

const KudosFilter = ({ onFilter }) => {
    const [filters, setFilters] = useState(initialFilters);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filters);
    };

    const handleReset = () => {
        setFilters(initialFilters);
        onFilter(initialFilters);
    };

    return (
        <form className="kudos-filter-form" onSubmit={handleSubmit}>
            <input name="sender" placeholder="Sender ID" value={filters.sender} onChange={handleChange} />
            <input name="receiver" placeholder="Receiver ID" value={filters.receiver} onChange={handleChange} />
            <input name="level" placeholder="Level" value={filters.level} onChange={handleChange} />
            <input name="behaviour" placeholder="Behaviour" value={filters.behaviour} onChange={handleChange} />
            <input name="points" placeholder="Points" value={filters.points} onChange={handleChange} type="number" min="1" />
            <input name="created_at" placeholder="Date" value={filters.created_at} onChange={handleChange} type="date" />
            <button type="submit" className="btn btn-primary">Filter</button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
        </form>
    );
};

export default KudosFilter;