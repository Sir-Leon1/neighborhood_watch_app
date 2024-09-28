import React, {useState, useEffect} from 'react';
import {Home, Users, Bell, Settings, LogOut, Menu, X, ShieldAlert} from 'lucide-react';
import './styles/navbar.css';
import {Link} from "react-router-dom";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleDashboard = () => {
        setIsCollapsed(!isCollapsed);
    };

    const navItems = [
        {icon: Home, label: 'Home', link: '/front/'},
        {icon: Users, label: 'Users', link: '/front/user-management'},
        {icon: Bell, label: 'Notifications', link: '/front/notifications'},
        {icon: Settings, label: 'Settings', link: '/front/settings'},
        {icon: ShieldAlert , label: 'Incidents', link: '/front/incidents'},
    ];

    return (
        <div className={`dashboard ${isMobile ? 'mobile' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="dashboard-header">
                <img src={`${process.env.PUBLIC_URL}/assets/app-logo.jpg`} alt="App Logo" className="app-logo"/>
                {isMobile && (
                    <button className="toggle-btn" onClick={toggleDashboard}>
                        {isCollapsed ? <Menu size={24}/> : <X size={24}/>}
                    </button>
                )}
            </div>

            <nav className="dashboard-nav">
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.link} className="nav-link">
                                <item.icon size={24}/>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="dashboard-profile">
                <img src={`${process.env.PUBLIC_URL}/assets/user.jpg`} alt="User Profile" className="profile-photo"/>
                <button className="logout-btn">
                    <LogOut size={24}/>
                    <span>Logout</span>
                </button>
            </div>

        </div>
    );
};

export default Sidebar;