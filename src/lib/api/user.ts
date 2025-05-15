// src/api/users.ts

import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

// 배송지 목록을 가져오는 함수
export const getAddresses = async () => {
  try {
    const response = await axios.get(`${API_URL}/addresses`,
      {withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error("배송지 목록 가져오기 오류:", error);
    throw error;
  }
};

// 배송지 추가 함수
export const addAddress = async (newAddress: any) => {
  try {
    const response = await axios.post(`${API_URL}/addresses`, newAddress,{
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("배송지 추가 실패:", error);
    throw error;
  }
};

// 배송지 삭제 함수
export const deleteAddress = async (id: number) => {
  try { 
    await axios.delete(`${API_URL}/addresses/${id}`,
      {withCredentials:true}
    );
  } catch (error) {
    console.error("배송지 삭제 실패:", error);
    throw error;
  }
};

// 배송지 수정 함수
export const updateAddress = async (id: number) => {
  try {
    const response = await axios.patch(`${API_URL}/addresses/${id}/default`,
      {},
      {withCredentials:true}
    );
    return response.data;
  } catch (error) {
    console.error("배송지 수정 실패:", error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/user-info`,
      {withCredentials: true}
    )
    return response.data.data;
  }catch (error) {
    console.error("유저정보 불러오기 실패",error);
    throw error;
  }
};