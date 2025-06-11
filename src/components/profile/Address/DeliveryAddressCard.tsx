import { Button } from "@/components/ui/button";
import { DeliveryAddress } from "@/types/userData";

type DeliveryAddressCardProps = {
  data: DeliveryAddress;
  onChange?: (newData: DeliveryAddressCardProps["data"]) => void;
  onDelete?: () => void;
  onSetMain?: () => void;
};

export default function DeliveryAddressCard({ data, onDelete, onSetMain }: DeliveryAddressCardProps) {
  return (
    <div className="border rounded-md p-4 bg-gray-50 mb-3">
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold">{data.name}</div>
        <div className="space-x-2">
          {!data.isDefault && onSetMain && (
            <Button size="sm" className="bg-blue-500 text-white" onClick={onSetMain}>
              대표 설정
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={onDelete}>
            배송지 삭제
          </Button>
        </div>
      </div>
      <div className="text-xs text-gray-600 mb-1">
        {data.isDefault ? (
          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px]">대표배송지</span>
        ) : (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[10px]">추가배송지</span>
        )}
      </div>
      <div className="text-sm space-y-1 mt-2">
        <div>휴대폰 : {data.phoneNumber}</div>
        <div>배송지 : {data.addressLine1} {data.addressLine2}</div>
        <div>우편 번호 : {data.zipCode}</div>
      </div>
    </div>
  );
}
