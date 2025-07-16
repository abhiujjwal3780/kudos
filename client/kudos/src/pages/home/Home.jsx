import React from "react";
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="banner-section">
                <h1>
                    Welcome to <span className="kudos-highlight">Kudos!</span>
                </h1>
                <p className="subtitle">
                    Celebrate your team. Appreciate your colleagues. Build a culture of recognition.
                </p>
            </div>
            <div className="features-section">
                <h2 className="features-title">What can you do?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Send Kudos</h3>
                        <p>Recognize your teammates for their hard work and positive impact.</p>
                    </div>
                    <div className="feature-card">
                        <h3>View Kudos</h3>
                        <p>See all the kudos you’ve received and celebrate your achievements.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Manage Profile</h3>
                        <p>Update your profile and see your kudos history in one place.</p>
                    </div>
                </div>
            </div>
            <div className="cta-section">
                <h2>Start Spreading Positivity!</h2>
                <p>
                    Ready to make someone’s day? <span role="img" aria-label="sparkles">✨</span>
                </p>
                <a href="/login" className="cta-btn">Login & Give Kudos</a>
            </div>
        </div>
    );
}

export default Home;