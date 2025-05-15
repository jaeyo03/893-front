// lib/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // 백엔드 서버 주소에 맞게 수정
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 자동으로 Authorization 헤더 추가
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
