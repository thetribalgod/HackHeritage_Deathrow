import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1", // Your backend API base URL
  withCredentials: true, // Include credentials like cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
