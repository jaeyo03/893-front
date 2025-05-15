import axios from "axios";
import { BaseResponse, PaymentResponse } from "@/types/response.types";
import { TossPaymentRequest } from "@/types/payment.types";

const axiosPaymentInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export async function postPaymentInfo(auctionId: number, paymentRequest: TossPaymentRequest) : Promise<BaseResponse<PaymentResponse>>{
  try {
    const response = await axiosPaymentInstance.post(`/api/payment/${auctionId}`, paymentRequest);
    return response.data;
  } catch (error) {
    console.error('결제 정보 전송 실패:', error);
    throw error;
  }
}
