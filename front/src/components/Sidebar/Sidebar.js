import React, {useState, useEffect} from 'react';
import {Home, Users, Bell, Settings, LogOut, Menu, X, ShieldAlert} from 'lucide-react';
import './styles/navbar.css';
import {useAuth} from "../Auth/AuthContext";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const { logout } = useAuth();

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
        {icon: Home, label: 'Home', link: '/'},
        {icon: Users, label: 'Users', link: '/user-management'},
        {icon: Bell, label: 'Notifications', link: '/notifications'},
        {icon: Settings, label: 'Settings', link: '/settings'},
        {icon: ShieldAlert , label: 'Incidents', link: '/incidents'},
    ];


    return (
        <div className={`dashboard ${isMobile ? 'mobile' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="dashboard-header">
                <img src='/assets/app-logo.jpg' alt="App Logo" className="app-logo"/>
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
                            <a href={item.link} className="nav-link">
                                <item.icon size={24}/>
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="dashboard-profile">
                <img src="/assets/user.jpg" alt="User Profile" className="profile-photo"/>
                <button className="logout-btn" onClick={logout}>
                    <LogOut size={24}/>
                    <span>Logout</span>
                </button>
            </div>

        </div>
    );
};

export default Sidebar;