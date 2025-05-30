import {
  OrderResponse,
  BaseResponse,
  ErrorResponse,
} from "@/types/response.types";
import {
  TossPaymentConfirmRequest,
  TossPaymentConfirmResponse,
  TossPaymentRequest,
  TossPaymentResponse,
} from "@/types/payment.types";
import axios from "axios";

// 서버 컴포넌트 버전
export async function getUserOrderInfoForServer(
  auctionId: string,
  cookieHeader: string
): Promise<BaseResponse<OrderResponse> | ErrorResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auctions/${auctionId}/orders`,
      {
        headers: {
          Cookie: cookieHeader,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching user payment info:", error);
    return {
      type: "error",
      title: "Failed to fetch user payment info",
      status: 500,
      detail: "Failed to fetch user payment info",
      instance: `/api/auctions/${auctionId}/orders`,
    };
  }
}

// 클라이언트 컴포넌트 버전
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export async function postPaymentInfo(
  auctionId: string,
  paymentRequest: TossPaymentRequest
): Promise<BaseResponse<TossPaymentResponse | null>> {
  try {
    const response = await axiosInstance.post(
      `/api/auctions/${auctionId}/payments`,
      paymentRequest
    );
    return response.data;
  } catch (error) {
    console.error("Error posting payment info:", error);
    return {
      data: null,
      message: "Failed to post payment info",
      code: 500,
    };
  }
}

export async function postPaymentConfirm(
  paymentConfirmRequest: TossPaymentConfirmRequest,
  cookieHeader: string
): Promise<BaseResponse<TossPaymentConfirmResponse> | ErrorResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payments/confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(paymentConfirmRequest),
        cache: "no-store",
      }
    );

    return response.json();
  } catch (error) {
    console.error("Error posting payment confirm:", error);
    throw error;
  }
}
