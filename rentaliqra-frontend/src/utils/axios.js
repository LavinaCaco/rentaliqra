import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL? `${process.env.REACT_APP_BASE_URL}/api` : "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
