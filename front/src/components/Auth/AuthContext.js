import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Function to log in (get JWT from server)
  const login = async (username, password) => {
    // Normally, you send a request to your API to authenticate
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const { token, userData } = data;  // Assuming the server returns a token and user info

      // Store token and user in state/localStorage
      setToken(token);
      setUser(userData);
      localStorage.setItem('token', token);  // Store token
      localStorage.setItem('user', JSON.stringify(userData));  // Store user info
      navigate('/dashboard');  // Navigate to protected route after login
    } else {
      alert('Login failed');
    }
  };

  // Function to log out
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');  // Clear token from localStorage
    localStorage.removeItem('user');   // Clear user data
    navigate('/login');
  };

  // Check localStorage to persist login status
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
