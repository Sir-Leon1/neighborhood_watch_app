import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

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
