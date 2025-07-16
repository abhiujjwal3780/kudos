import React from "react";
import './Error.css'; // Import the CSS file for styling

const ErrorPage = () => {
    return (
        <div className="error-container">
            <h1 className="error-title">404 - Page Not Found</h1>
            <p className="error-message">The page you are looking for does not exist.</p>
            <a href="/" className="error-link">Go to Home</a>
        </div>
    );
}           
export default ErrorPage;