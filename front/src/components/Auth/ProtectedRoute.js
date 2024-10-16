import React, {useContext} from 'react';
import  { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { access_token } = useAuth()
    return access_token ? children : <Navigate to='/loginreg' />;
};

export default ProtectedRoute;
