import React from 'react';
import {AlertTriangle, Calendar, Bell, Settings, FileText, PlusCircle, Phone} from 'lucide-react';
import './styles/userdash.css';
import QuickActionsBtn from "./QuickactionBtn";

const UserDashboard = () => {
    const userName = "John Doe"; // This would typically come from a user context or prop

    const recentIncidents = [
        {id: 1, type: 'Suspicious Activity', location: '123 Main St', time: '2 hours ago'},
        {id: 2, type: 'Noise Complaint', location: '456 Elm St', time: '5 hours ago'},
        {id: 3, type: 'Lost Pet', location: '789 Oak St', time: '1 day ago'},
    ];

    const upcomingEvents = [
        {id: 1, name: 'Neighborhood Meeting', date: 'Sep 15, 2024', time: '7:00 PM'},
        {id: 2, name: 'Community Cleanup', date: 'Sep 20, 2024', time: '9:00 AM'},
        {id: 3, name: 'Block Party', date: 'Sep 25, 2024', time: '4:00 PM'},
    ];

    const quickActions = [
        {id: 'report', icon: FileText, label: 'Report Incident', link: '/report'},
        {id: 'notifications', icon: Bell, label: 'Notifications'},
        {id: 'settings', icon: Settings, label: 'Settings'},
        {id: 'newEvent', icon: PlusCircle, label: 'New Event'},
    ];


    const adminContacts = [
        {id: 1, name: 'John Smith', role: 'Community Manager', phone: '(555) 123-4567'},
        {id: 2, name: 'Jane Doe', role: 'Security Coordinator', phone: '(555) 987-6543'},
    ];


    return (
        <div className="userdash">
            <div className="user-header">
                <h1>{userName}</h1>
                <button className="edit-profile-btn">Edit Profile</button>
            </div>

            <div className="card incidents-card">
                <div className="card-image"></div>
                <div className="card-content">
                    <h2>Recently Reported Issues</h2>
                    <ul>
                        {recentIncidents.map(incident => (
                            <li key={incident.id}>
                                <div className="incident-info">
                                    <AlertTriangle size={16}/>
                                    <div>
                                        <span className="incident-type">{incident.type}</span>
                                        <div className="incident-location">{incident.location}</div>
                                    </div>
                                </div>
                                <div className="incident-time">{incident.time}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="card events-card">
                <div className="card-image-events"></div>
                <div className="card-content">
                    <h2>Upcoming Events</h2>
                    <ul>
                        {upcomingEvents.map(event => (
                            <li key={event.id}>
                                <div className="event-info">
                                    <Calendar size={16}/>
                                    <div>
                                        <span className="event-name">{event.name}</span>
                                        <div className="event-date">{event.date}</div>
                                    </div>
                                </div>
                                <div className="event-time">{event.time}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


            <div className="card quick-actions-card">
                <div className="card-content">
                <h2>Quick Actions</h2>
                <div className="quick-actions-grid">
                    {quickActions.map(action => (
                        <QuickActionsBtn key={action.id} id={action.id} path={action.link} icon={action.icon} label={action.label} />
                    ))}
                </div>
                </div>
            </div>

            <div className="card admin-contacts-card">
                <div className="card-content">
                <h2>Admin Contacts for Urgent Issues</h2>
                <ul>
                    {adminContacts.map(contact => (
                        <li key={contact.id}>
                            <div className="contact-info">
                                <Phone size={16}/>
                                <div>
                                    <span className="contact-name">{contact.name}</span>
                                    <div className="contact-role">{contact.role}</div>
                                </div>
                            </div>
                            <div className="contact-phone">{contact.phone}</div>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </div>
    );
};

export default UserDashboard;