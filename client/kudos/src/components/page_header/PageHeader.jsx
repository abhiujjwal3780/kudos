import React from 'react';  
import './PageHeader.css';
import companyLogo from '../../assets/images/company_logo.svg';
import userLogo from '../../assets/images/user_logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { paths } from '../../utils';

import { UserContext } from '../../store/UserContext';
import { useContext } from 'react';

const PageHeader = () => {
    const { user, setUser } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    // Helper to check if a path is active
    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
        navigate(paths.login);
    };

    return (
        <div className='page-header-container'>
            <div className="left-container ">
                <Link to="/">
                    <img src={companyLogo} alt="Company Logo" className='app-logo' />
                </Link>
            </div>

            <div className='right-container'>
                <Link to={paths.home}>
                    <div className={`text-nav-link${isActive(paths.home) ? ' active' : ''}`}>Home</div>
                </Link>
                <Link to={paths.create_org}>
                    <div className={`text-nav-link${isActive(paths.create_org) ? ' active' : ''}`}>Create Org</div>
                </Link>
                {user ? (
                    <>
                        <Link to={paths.dashboard}>
                            <div className={`text-nav-link${isActive(paths.dashboard) ? ' active' : ''}`}>Dashboard</div>
                        </Link>
                        
                        <Link to={paths.create_user}>
                            <div className={`text-nav-link${isActive(paths.create_user) ? ' active' : ''}`}>Create User</div>
                        </Link>
                        
                        <div className="text-nav-link" onClick={handleLogout} style={{ cursor: "pointer" }}>
                            Logout
                        </div>
                        <img src={userLogo} alt="User" className='user-logo' />
                    </>
                ) : (
                    <>
                        
                        <Link to={paths.login}>
                            <div className={`text-nav-link${isActive(paths.login) ? ' active' : ''}`}>Login</div>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default PageHeader;