import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 URL 설정
  headers: {
    "Content-Type": "application/json;charset=UTF-8", // JSON 형식
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      console.log("Token found:", token);
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("No token found");
    }
    return config;
  },
  (error) => {
    console.log("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data === "jwt expired") {
      window.location.reload();
    }
  }
); //토큰 만료시

export default axiosInstance;
