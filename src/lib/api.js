// src/lib/api.js
import axios from 'axios';

// ✅ Dynamically determine base URL
const API = axios.create({
  baseURL:
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5000/api'
    : 'https://gmailbackend-3r48.onrender.com/api',


  
  withCredentials: true,
 
});

// ✅ Attach JWT token from localStorage to every request
API.interceptors.request.use((req) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.warn('⚠️ Invalid token in localStorage');
  }

  return req;
});

export default API;
/**src/lib/api.js
import axios from 'axios';

// ✅ Dynamically determine base URL
const baseURL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5000/api'
    : 'https://gmailbackend-3r48.onrender.com/api';

const API = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Attach JWT token from localStorage to every request
API.interceptors.request.use((req) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.warn('⚠️ Invalid token in localStorage');
  }

  return req;
});

export default API;**/