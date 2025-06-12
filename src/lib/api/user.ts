// src/api/users.ts

import axios from "axios";
import { DeliveryAddress } from "@/types/userData";

// 배송지 목록을 가져오는 함수
export const getAddresses = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/addresses`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error("배송지 목록 가져오기 오류:", error);
    throw error;
  }
};

// 배송지 추가 함수
export const addAddress = async (newAddress: DeliveryAddress) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/addresses`,
      newAddress,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("배송지 추가 실패:", error);
    throw error;
  }
};

// 배송지 삭제 함수
export const deleteAddress = async (id: number) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/addresses/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("배송지 삭제 실패:", error);
    throw error;
  }
};

// 배송지 수정 함수
export const updateAddress = async (id: number) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/addresses/${id}/default`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("배송지 수정 실패:", error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user-info`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("유저정보 불러오기 실패", error);
    throw error;
  }
};

export const getMyBidsProduct = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/bids`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("유저정보 불러오기 실패", error);
    throw error;
  }
};

export const getMyAuctionsProduct = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auctions`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("유저정보 불러오기 실패", error);
    throw error;
  }
};

export const getMyScrapsProduct = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/scraps`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("유저정보 불러오기 실패", error);
    throw error;
  }
};

export const getMyPaymentsProduct = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}}/payments`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("유저정보 불러오기 실패", error);
    throw error;
  }
};
