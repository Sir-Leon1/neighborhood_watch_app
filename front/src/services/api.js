import axios from 'axios';

const API_URL = 'https://fortressapi.vilet.tech/api';

export const fetchIncidents = async () => {
    try {
        const response = await axios.get(`${API_URL}/incidents`);
        return response.data;
    } catch (error) {
        console.error('Error fetching incidents:', error);
        throw error;
    }
};

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export const fetchNotifs = async () => {
    try {
        const response = await axios.get(`${API_URL}/incidents/notifications`);
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
}

export const login = async (email, password) => {
    try {
        const response = await fetch( '${API_URL}/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}
