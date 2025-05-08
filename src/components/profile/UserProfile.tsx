'use client'

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User,Pencil } from "lucide-react";
import { useState } from "react";
import { Dialog,DialogContent,DialogTrigger,DialogTitle,DialogFooter,DialogHeader } from "@/components/ui/dialog";
import  DeliveryAddressCard  from "@/components/profile/DeliveryAddressCard";

type AddressInfo = {
  label: string;
  name: string;
  phone: string;
  city: string;
  address: string;
  detail: string;
  isMain: boolean;
};

export default function UserProfile() {
  // 상태 설정

  const [dialogOpen, setDialogOpen] = useState(false)

  const [userInfo, setUserInfo] = useState({
    name: "홍길동",
    email: "user@example.com",
    address: "대표 배송지",
    phone: "010-1234-5678",
  });

  const [selectedAddress] = useState(userInfo.address);

  const [addresses, setAddresses] = useState<AddressInfo[]>([
    {
      label: "배송지",
      name: "user",
      phone: "010 - xxxx - xxxx",
      city: "서울",
      address: "",
      detail: "",
      isMain: true,
    },
    {
      label: "집",
      name: "user",
      phone: "010 - xxxx - xxxx",
      city: "서울",
      address: "",
      detail: "",
      isMain: false,
    },
  ]);

  const addNewAddress = () => {
    setAddresses((prev) => [
      ...prev,
      {
        label: "새 배송지",
        name: "user",
        phone: "",
        city: "",
        address: "",
        detail: "",
        isMain: false,
      },
    ]);
  };

  const setMainAddress = (index: number) => {
    setAddresses((prev) =>
      prev.map((addr, i) => ({
        ...addr,
        isMain: i === index,
      }))
    );
  };

  const deleteAddress = (index: number) => {
    setAddresses((prev) => prev.filter((_, i) => i !== index));
  };
  // 정보 수정 함수
  const handleSave = () => {
    // 예시: 수정된 정보로 상태 업데이트
    setUserInfo({
      ...userInfo,
      address: selectedAddress, // 예시로 변경
    });
    setDialogOpen(false)
  };

  return (
    <Card className="w-full  p-4 mb-4 relative mx-auto">
      <div className="flex">
        {/* 좌측 아바타 */}
        <div className="mr-6 flex flex-col items-center w-24">
          <div className="ml-6 w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl mr-6">
            <User size={40} />
          </div>
          {/* 편집 아이콘 추가 */}
          <div className="absolute w-8 h-8 bottom-[48px] left-[84px] rounded-full flex items-center justify-center bg-white border-[1px]">
            <Pencil size={20} className="text-black cursor-pointer" />
          </div>
          {/* 이미지 하단 유저 이름 */}
          <div className="mt-2 text-sm font-semibold text-center">{userInfo.name}</div>
        </div>

        {/* 우측 정보 영역 */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-y-2">
          <div className="text-sm">
            <p className="text-gray-500">이메일</p>
            <p>{userInfo.email}</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-500">이름</p>
            <p>{userInfo.name}</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-500">배송지</p>
            <p>{userInfo.address}</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-500">전화번호</p>
            <p>{userInfo.phone}</p>
          </div>
        </div>
      </div>

      {/* 배송지 수정 버튼 */}
      {/* Dialog for address selection */}
      <div className="absolute bottom-4 right-8">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="text-sm h-8 bg-main">
              배송지 수정
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>배송지 목록</DialogTitle>
            </DialogHeader>

            <div className="mt-4 max-h-[400px] overflow-y-auto space-y-2">
              {addresses.map((addr, index) => (
                <DeliveryAddressCard
                  key={index}
                  data={addr}
                  onDelete={() => deleteAddress(index)}
                  onSetMain={() => setMainAddress(index)}
                />
              ))}
            </div>

            {/* + 버튼 */}
            <div className="flex justify-center mt-4">
              <button
                onClick={addNewAddress}
                className="w-8 h-8 border rounded-full text-xl flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>


            <DialogFooter className="mt-4">
              <Button className="bg-main" onClick={handleSave}>저장</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}
