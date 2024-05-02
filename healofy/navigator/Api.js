import axios from 'axios';

export default function axiosWithAuth() {
    const token = localStorage.getItem('token');
    
    return axios.create({
        baseURL: 'http://localhost:9090/api',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '', // Include token if available
        },
    });
}
