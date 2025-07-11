import axios from 'axios';

const API = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5000/api'
      : 'https://gmailbackend-3r48.onrender.com/api',
  withCredentials: true,
});

// ✅ Attach JWT token to every request if available
API.interceptors.request.use((req) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.warn('Invalid user token in localStorage');
  }

  return req;
});

export default API;
