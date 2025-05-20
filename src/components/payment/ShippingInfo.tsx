interface ShippingInfoProps {
  name : string;
  addressLine1 : string;
  addressLine2 : string;
  phoneNumber : string;
}

export default function ShippingInfo({ name, addressLine1, addressLine2, phoneNumber }: ShippingInfoProps) {
  return (
    <div className="border rounded-lg shadow-sm">
      {/* Header */}
      <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-semibold">
          배송지 <span className="font-normal">| {name}</span>
        </div>
        <button className="border border-blue-500 text-blue-600 text-sm px-3 py-1 rounded-md hover:bg-blue-50">
          배송지 변경
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-4">
        <span className="inline-block border border-gray-400 text-xs px-2 py-0.5 rounded-full mb-3">
          기본배송지
        </span>
        <div className="text-gray-800 mb-1">{addressLine1} {addressLine2}</div>
        <div className="text-gray-600">휴대폰 : {phoneNumber}</div>
      </div>
    </div>
  );
}
