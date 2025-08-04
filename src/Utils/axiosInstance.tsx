import axios from "axios";
// Debug log to check if env variable is loaded
console.log("REACT_APP_Base_URL:", process.env.REACT_APP_Base_URL);

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_Base_URL,
});

 axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
