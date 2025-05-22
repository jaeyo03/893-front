import { OrderResponse, BaseResponse } from "@/types/response.types";
import { TossPaymentConfirmRequest, TossPaymentConfirmResponse, TossPaymentRequest, TossPaymentResponse } from "@/types/payment.types";
import axios from "axios";

// 서버 컴포넌트 버전
export async function getUserOrderInfoForServer(auctionId : string, cookieHeader : string) : Promise<BaseResponse<OrderResponse | null>>{
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auctions/${auctionId}/orders`, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching user payment info:", error);
    return {
      data: null,
      message: "Failed to fetch user payment info",
      code: 500,
    }
  }
}

// 클라이언트 컴포넌트 버전
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export async function getUserOrderInfoForClient(auctionId : string) : Promise<BaseResponse<OrderResponse | null>>{
  try {
    const response = await axiosInstance.get(`/api/auctions/${auctionId}/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user payment info:", error);
    return {
      data: null,
      message: "Failed to fetch user payment info",
      code: 500,
    }
  }
}

export async function postPaymentInfo(auctionId : string, paymentRequest : TossPaymentRequest) : Promise<BaseResponse<TossPaymentResponse | null>>{
  try {
    const response = await axiosInstance.post(`/api/auctions/${auctionId}/payments`, paymentRequest);
    return response.data;
  } catch (error) {
    console.error("Error posting payment info:", error);
    return {
      data: null,
      message: "Failed to post payment info",
      code: 500,
    }
  }
}

export async function postPaymentConfirm(paymentConfirmRequest : TossPaymentConfirmRequest) : Promise<BaseResponse<TossPaymentConfirmResponse | null>>{
  try {
    const response = await axiosInstance.post(`/api/payments/confirm`, paymentConfirmRequest);
    return response.data;
  } catch (error) {
    console.error("Error posting payment confirm:", error);
    return {
      data: null,
      message: "Failed to post payment confirm",
      code: 500,
    }
  }
}
