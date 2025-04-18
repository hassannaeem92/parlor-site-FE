import axios from "axios";

const backendValidUserForFile = axios.create({
  baseURL: "http://localhost:7001/api",
  // baseURL: "https://be.beautyserviceathome.com/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add a request interceptor
backendValidUserForFile.interceptors.request.use(
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

export default backendValidUserForFile;
