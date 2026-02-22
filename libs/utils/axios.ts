// axios.ts
import Axios, { AxiosInstance } from "axios";
import { decryptData } from "./cryptohelper";
import { useAuthStore } from "../store/Authstore";


const axiosInstance: AxiosInstance = Axios.create({
  baseURL: "https://admin-buildconnect.ivantage.africa/v1/",
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const encryptedSession = sessionStorage.getItem("authToken");
     console.log(encryptedSession);
      if (encryptedSession) {
        const token = await decryptData(encryptedSession);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
  
    if (error.response?.status === 401 || error.response?.status === 500) {
      if (typeof window !== "undefined") {
        const {clearAuthData } = useAuthStore.getState();
        clearAuthData();
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
