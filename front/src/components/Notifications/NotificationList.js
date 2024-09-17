import React, {useState, useEffect} from 'react';
import {fetchNotifs} from '../../services/api';
import {Bell, AlertTriangle, CheckCircle, X, LoaderCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import './styles/notificationlist.css';
import './styles/searchbar.css';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPerPage = 10;

    useEffect(() => {
        fetchNotifs()
            .then(data => setNotifications(data))
            .catch(error => console.error('Error fetching notifications:', error));
    }, []);

    const filteredNotifications = notifications.filter(notification =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedNotifications = [...filteredNotifications].sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
    );

    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = sortedNotifications.slice(indexOfFirstNotification, indexOfLastNotification);

    const totalPages = Math.ceil(sortedNotifications.length / notificationsPerPage);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Open':
                return <AlertTriangle style={{color: '#EAB308'}}/>;
            case 'Closed':
                return <CheckCircle style={{color: '#22C55E'}}/>;
            case 'In Progress':
                return <LoaderCircle style={{color: '#3B82F6'}}/>;
            default:
                return <Bell style={{color: '#3B82F6'}}/>;
        }
    };

    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const openPopup = (notification) => {
        setSelectedNotification(notification);
    };

    const closePopup = () => {
        setSelectedNotification(null);
    };

    const changePage = (newPage) => {
        setCurrentPage(newPage);
    }

    return (
        <div className="notifications-page">
            <h1>Notifications</h1>
            <div className="search-bar">
                <Search size={20}/>
                <input
                    type="text"
                    placeholder="Search by title or status..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>
            <div className="notifications-list">
                {currentNotifications.map((notification) => (
                    <div key={notification.id} className="notification-card" onClick={() => openPopup(notification)}>
                        <div className="notification-header">
                            <h2 className="notification-title">
                                {getStatusIcon(notification.status)}
                                {notification.title}
                            </h2>
                            <p className="notification-status">
                                Status: {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                            </p>
                        </div>
                        <div className="notification-content">
                            <p className="notification-timestamp">
                                {formatDate(notification.timestamp)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    <ChevronLeft size={20}/>
                </button>
                <span>{currentPage} of {totalPages}</span>
                <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    <ChevronRight size={20}/>
                </button>
            </div>
            {selectedNotification && (
                <div className="popup">
                    <div className="popup-content">
                        <div className="popup-header">
                            {getStatusIcon(selectedNotification.status)}
                            <h2>{selectedNotification.title}</h2>
                            <button className="close-button" onClick={closePopup}>
                                <X size={24}/>
                            </button>
                        </div>
                        <div className="popup-body">
                            <p><strong>Description:</strong> {selectedNotification.description}</p>
                            <p><strong>Status:</strong> {selectedNotification.status}</p>
                            <p><strong>Reported at:</strong> {formatDate(selectedNotification.reportedAt)}</p>
                            <p><strong>Location:</strong> {selectedNotification.location}</p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default NotificationsPage;