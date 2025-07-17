import React from "react";
import "./NavBar.css";

const Navbar = ({ navItems = [] }) => (
    <nav className="common-navbar">
        {navItems.map(item => (
            <div
                key={item.label}
                className={`navbar-link${item.active ? " active" : ""}`}
                onClick={item.onClick}
            >
                {item.icon && <span className="navbar-icon">{item.icon}</span>}
                {item.label}
            </div>
        ))}
    </nav>
);

export default Navbar;