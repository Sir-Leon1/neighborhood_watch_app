import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import IncidentList from './components/Incidents/IncidentList';
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import UsersList from "./pages/Users";
import NotificationList from "./pages/Notifications";
import Layout from './pages/Layout';
import UserDashboard from "./components/Dashboard/UserDashboard";
import IncidentReportPage from "./components/Incidents/ReportIncident";


function AppRoutes() {
    const basename = '/front';
    return (
        <Router basename={basename}>
            <Layout>
                <Routes>
                    <Route path='front/' element={<AdminDashboard/>}/>
                    <Route path='front/incidents' element={<IncidentList/>}/>
                    <Route path='front/user-management' element={<UsersList/>}/>
                    <Route path='front/notifications' element={<NotificationList/>}/>
                    <Route path='front/userdashboard' element={<UserDashboard/>}/>
                    <Route path='front/report' element={<IncidentReportPage/>}/>
                </Routes>
            </Layout >
        </Router>
);
}

export default AppRoutes;