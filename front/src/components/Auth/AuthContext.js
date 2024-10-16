import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {loginApi} from "../../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [access_token, setAccess] = useState(null);
  const [refresh_token, setRefresh] = useState(null);
  const navigate = useNavigate();

  // Function to log in (get JWT from server)
  const login = async (email, password) => {
    // Normally, you send a request to your API to authenticate
    const response = await loginApi(email, password);
    console.log(response);

    if (response.status === 200 || response.status === 201) {
      const data = response.data;
      const { access_token, refresh_token } = data;  // Assuming the server returns a token and user info

      // Store token and user in state/localStorage
      setAccess(access_token);
      setRefresh(refresh_token);
      localStorage.setItem('access_token', access_token);// Store token
      console.log(localStorage.getItem('access_token'));
      localStorage.setItem('refresh_token', refresh_token);  // Store user info
      navigate('/');  // Navigate to protected route after login
    } else {
      alert('Login failed');
    }
  };

  // Function to log out
  const logout = () => {
    setAccess(null);
    setRefresh(null);
    localStorage.removeItem('access_token');  // Clear token from localStorage
    localStorage.removeItem('refresh_token');   // Clear user data
    navigate('/loginreg');
  };

  // Check localStorage to persist login status
  useEffect(() => {
    const storedAccess = localStorage.getItem('access_token');
    console.log(storedAccess);
    const storedRefresh = localStorage.getItem('refresh_token');
    if (storedAccess && storedRefresh) {
      setAccess(storedAccess);
      setRefresh(storedRefresh);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ refresh_token, access_token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
