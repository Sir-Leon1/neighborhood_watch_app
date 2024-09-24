import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import IncidentList from './components/Incidents/IncidentList';
import UsersList from "./pages/Users";
import AdminDash from "./pages/AdminDash";
import NotificationList from "./pages/Notifications";
import UserDash from "./pages/UserDash";
import IncidentReportPage from "./components/Incidents/ReportIncident";
import Home from "./pages/Home";

import SuperTokens, {SuperTokensWrapper} from "supertokens-auth-react";
import {getSuperTokensRoutesForReactRouterDom} from "supertokens-auth-react/ui";
import {SessionAuth} from "supertokens-auth-react/recipe/session";
import {PreBuiltUIList, SuperTokensConfig, ComponentWrapper} from "./config";


SuperTokens.init(SuperTokensConfig);

function AppRoutes() {
    return (
        <SuperTokensWrapper>
            <ComponentWrapper>
                <div className="App app-container">
                    <Router>
                            <div className="fill">
                                <Routes>
                                    {/* This shows the login UI on "/auth" route */}
                                    {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), PreBuiltUIList)}

                                    <Route
                                        path="/"
                                        element={
                                            /* This protects the "/" route so that it shows
                                        <Home /> only if the user is logged in.
                                        Else it redirects the user to "/auth" */
                                            <SessionAuth>
                                                <Home/>
                                            </SessionAuth>
                                        }
                                    />

                                    <Route path='/Admin' element={<SessionAuth><AdminDash/></SessionAuth>}/>
                                    <Route path='/incidents' element={<SessionAuth><IncidentList/></SessionAuth>}/>
                                    <Route path='/user-management' element={<SessionAuth><UsersList/></SessionAuth>}/>
                                    <Route path='/notifications'
                                           element={<SessionAuth><NotificationList/></SessionAuth>}/>
                                    <Route path='/userdashboard' element={<SessionAuth><UserDash/></SessionAuth>}/>
                                    <Route path='/report' element={<SessionAuth><IncidentReportPage/></SessionAuth>}/>
                                </Routes>
                            </div>
                    </Router>
                </div>
            </ComponentWrapper>
        </SuperTokensWrapper>
    );
}

export default AppRoutes;

