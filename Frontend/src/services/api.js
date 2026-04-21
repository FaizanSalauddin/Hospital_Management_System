import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔐 smart token attach
API.interceptors.request.use((req) => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("token");

  if (adminToken) {
    req.headers.Authorization = `Bearer ${adminToken}`;
  } else if (userToken) {
    req.headers.Authorization = `Bearer ${userToken}`;
  }

  return req;
});

export default API;