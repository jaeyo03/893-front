import { CheckCircle, Package, Home, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TossPaymentConfirmResponse } from "@/types/payment.types";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function CompletedState({ paymentData }: { paymentData: TossPaymentConfirmResponse }) {
  if (!paymentData) return null

  return (
    <div className="space-y-8 grid items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <div className="bg-main/10 p-4 rounded-full mb-4">
          <CheckCircle className="h-12 w-12 text-main" />
        </div>
        <h1 className="text-3xl font-bold mb-2">결제가 완료되었습니다</h1>
        <p className="text-muted-foreground max-w-md">
          주문이 성공적으로 접수되었습니다. 아래 주문 내역을 확인해주세요.
        </p>
      </div>

      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold">주문 정보</h2>
              <p className="text-sm text-muted-foreground">주문번호: {paymentData.orderId}</p>
            </div>
            <div className="bg-main/10 text-main font-medium px-3 py-1 rounded-full text-sm">
              결제 완료
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium flex items-center">
                <Package className="h-4 w-4 mr-2" /> 주문 상품
              </h3>
              <div className="flex items-center gap-4 py-3 border-b">
                <div className="flex-1">
                  <h4>{paymentData.orderName}</h4>
                  <p className="text-main font-semibold mt-1">{formatCurrency(paymentData.totalAmount)}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Home className="h-4 w-4 mr-2" /> 주문자 정보
              </h3>
              <div className="bg-muted p-4 rounded-md">
                <p className="font-medium">{paymentData.customerName}</p>
                <p className="text-sm text-muted-foreground mt-1">연락처: {paymentData.customerMobilePhone}</p>
                <p className="text-sm text-muted-foreground mt-1">이메일: {paymentData.customerEmail}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
          <Link href="/profile" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              주문 내역 보기
            </Button>
          </Link>
          <Link href="/search" className="w-full sm:w-auto">
            <Button className="w-full bg-main hover:bg-main/90">
              쇼핑 계속하기 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}