import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 URL 설정
  headers: {
    "Content-Type": "application/json;charset=UTF-8", // JSON 형식
  },
});

export default axiosInstance;
