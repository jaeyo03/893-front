import { Status } from "@/types/productData";
import { Auction } from "@/types/response.types";

const statusMap: Record<Auction["status"], { label: string; color: string }> = {
  pending: { label: "경매 전", color: "bg-rightgray" },
  active: { label: "경매 중", color: "bg-main" },
  completed: { label: "종료", color: "bg-red" },
  cancelled: { label: "취소", color: "bg-red" },
};

interface ProductStatusProps {
  label: Status;
}

export default function ProductStatus({label} : ProductStatusProps) {
  const statusInfo = statusMap[label] ?? {
    label: "알 수 없음",
    color: "bg-red-500",
  };

  return (
    <div className={`p-1 w-16 flex mb-4 justify-center items-center text-sm font-bold text-white rounded ${statusInfo.color}`}>
      {statusInfo.label}
    </div>
  )
}