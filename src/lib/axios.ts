// lib/axios.ts
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 백엔드 서버 주소에 맞게 수정
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});