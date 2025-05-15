export type PaymentMethod = 'CREDIT_CARD' | 'NAVER_PAY' | 'KAKAO_PAY' | 'PHONE' | 'BANK_TRANSFER' | 'NORMAL';

export interface TossPaymentRequest {
  recipientName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  zipCode: string;
  paymentMethod: PaymentMethod;
  orderId: string;
  paymentKey: string;
  finalPrice: number;
  successUrl: string;
  failUrl: string;
}

export interface TossPaymentResponse {
  orderId: string;
  orderName: string;
  successUrl: string;
  failUrl: string;
  customerEmail: string;
  customerName: string;
  customerMobilePhone: string;
  finalPrice: number;
}
