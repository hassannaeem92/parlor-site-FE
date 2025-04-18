import axios from "axios";

const backendValidUser = axios.create({
  // baseURL: "https://be.beautyserviceathome.com/api",
  baseURL: "http://localhost:7001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
backendValidUser.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("nocClientToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default backendValidUser;
