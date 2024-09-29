import React from 'react';
import './styles/management_cards.css';
import './styles/admin_dash.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bell } from 'lucide-react';

const data = [
  { name: 'Mon', incidents: 4 },
  { name: 'Tue', incidents: 3 },
  { name: 'Wed', incidents: 2 },
  { name: 'Thu', incidents: 5 },
  { name: 'Fri', incidents: 3 },
  { name: 'Sat', incidents: 6 },
  { name: 'Sun', incidents: 4 },
];

const ActivityCard = ({ title, activities, icon }) => (
  <div className="activity-card card">
    <h2>{icon} {title}</h2>
    <ul>
      {activities.map((activity, index) => (
        <li key={index} className="activity-item">
          <span className="activity-content">{activity.content}</span>
          <span className="activity-time">{activity.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ManagementCard = ({ icon, title, link }) => (
    <div className="management">
      <a href={link} className="management-card">
        <div className="icon">{icon}</div>
      </a>
      <h2>{title}</h2>
    </div>
);

const AdminDashboard = () => {
  const recentIncidents = [
    { content: 'Suspicious activity reported on Oak Street', time: '2 minutes ago' },
    { content: 'Noise complaint at 123 Maple Avenue', time: '2 hours ago' },
    { content: 'Lost pet reported in Sunset Park area', time: '4 hours ago' },
  ];

  const recentRegistrations = [
    { content: 'New user registered: John Doe', time: '15 minutes ago' },
    { content: 'New user registered: Jane Smith', time: '3 hours ago' },
    { content: 'New user registered: Bob Johnson', time: '6 hours ago' },
  ];

  const recentAdminActions = [
    { content: 'Admin Sarah updated community guidelines', time: '1 hour ago' },
    { content: 'Admin Mike approved 5 new incident reports', time: '4 hours ago' },
    { content: 'Admin Lisa sent out monthly newsletter', time: '1 day ago' },
  ];

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="summary-cards">
        <div className="summary-card">
          <h2>Total Users</h2>
          <p className="big-number">1,234</p>
          <p className="small-text">+15 this week</p>
        </div>
        <div className="summary-card">
          <h2>Total Incidents</h2>
          <p className="big-number">287</p>
          <p className="small-text">23 this month</p>
        </div>
        <div className="summary-card">
          <h2>Pending Reports</h2>
          <p className="big-number">12</p>
          <p className="small-text">4 urgent</p>
        </div>
        <div className="summary-card">
          <h2>Active Notifications</h2>
          <p className="big-number">8</p>
          <p className="small-text">2 high priority</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="activity-feed">
          <ActivityCard title="Recent Incidents" activities={recentIncidents} icon="🚨" />
          <ActivityCard title="Recent Registrations" activities={recentRegistrations} icon="👤" />
          <ActivityCard title="Recent Admin Actions" activities={recentAdminActions} icon="🔧" />
        </div>

        <div className="management-cards">
          <ManagementCard title="Users" icon="👥" link="/user-management" />
          <ManagementCard title="Incidents" icon="📋" link="/incident-management" />
          <ManagementCard title="Settings" icon="⚙️" link="settings-managemet" />
          <ManagementCard title="Notifications" icon=<Bell style={{ color: '#3B82F6' }} /> link="notifications" />
        </div>


      </div>


    </div>
  );
};

export default AdminDashboard;