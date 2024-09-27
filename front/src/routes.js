import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import IncidentList from './components/Incidents/IncidentList';
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import UsersList from "./pages/Users";
import NotificationList from "./pages/Notifications";
import Layout from './pages/Layout';
import UserDashboard from "./components/Dashboard/UserDashboard";
import IncidentReportPage from "./components/Incidents/ReportIncident";


function AppRoutes() {
    return (
        <Router basename="/front">
            <Layout>
                <Routes>
                    <Route path='/' element={<AdminDashboard/>}/>
                    <Route path='/incidents' element={<IncidentList/>}/>
                    <Route path='/user-management' element={<UsersList/>}/>
                    <Route path='/notifications' element={<NotificationList/>}/>
                    <Route path='/userdashboard' element={<UserDashboard/>}/>
                    <Route path='/report' element={<IncidentReportPage/>}/>
                </Routes>
            </Layout >
        </Router>
);
}

export default AppRoutes;