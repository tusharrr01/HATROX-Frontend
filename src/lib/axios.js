import axios from "axios";

// Base API URL from Vite env: add VITE_API_URL=http://localhost:3000 in client/.env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // send/receive cookies automatically
  headers: { "Content-Type": "application/json" },
});

export default api;
