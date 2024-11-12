import axios from "axios";
const api = axios.create({
  baseURL: "https://care-plus-topaz.vercel.app/api/v1",
  headers: { "Content-Type": "application/json" },
});
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
