import React from "react";
import "./Dashboard.css";

const dummyKudos = [
    { id: 1, from: "Alice", to: "Bob", message: "Great teamwork on the project!", date: "2024-07-15" },
    { id: 2, from: "Charlie", to: "Dana", message: "Thanks for your help!", date: "2024-07-14" },
    { id: 3, from: "Eve", to: "Frank", message: "Awesome presentation!", date: "2024-07-13" },
];

const KudosCarousel = () => {
    // Replace with real carousel logic or a library like react-slick
    return (
        <div className="kudos-carousel">
            <h2>Latest Kudos</h2>
            <div className="carousel-cards">
                {dummyKudos.map(kudo => (
                    <div className="kudo-card" key={kudo.id}>
                        <div className="kudo-message">"{kudo.message}"</div>
                        <div className="kudo-meta">
                            <span>From: <b>{kudo.from}</b></span>
                            <span>To: <b>{kudo.to}</b></span>
                        </div>
                        <div className="kudo-date">{kudo.date}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KudosCarousel;