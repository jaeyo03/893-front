'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogHeader
} from "@/components/ui/dialog";

import DeliveryAddressCard from "@/components/profile/Address/DeliveryAddressCard";
import AddressModal from "./Address/AddressModal";
import { DeliveryAddress } from "@/types/userData";
import { getAddresses } from "@/lib/api/user";

export default function UserProfile() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const [userInfo, setUserInfo] = useState({
    name: "짱구",
    email: "user@example.com",
    address: "",
    phone: "",
    imageUrl: "/images/신짱구.png",
  });

  // 초기값을 빈 배열로 설정하여 undefined 방어
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);

  useEffect(() => {
    getAddresses()
      .then((data) => {
        if (Array.isArray(data)) {
          setAddresses(data);
          
          // 첫 번째 대표 배송지를 userInfo에 반영
          const mainAddress = data.find((addr) => addr.isDefault);
          if (mainAddress) {
            setUserInfo((prev) => ({
              ...prev,
              address: `${mainAddress.addressLine1} ${mainAddress.addressLine2}`,
              phone: mainAddress.phoneNumber,
            }));
          }
        } else {
          console.error("API에서 배열이 아닌 값을 반환함:", data);
        }
      })
      .catch((error) => {
        console.error("배송지 목록 가져오기 오류:", error);
      });
  }, []);
  
  // 기본 배송지 업데이트
  const updateUserInfoFromMainAddress = () => {
    if (!addresses) return; // addresses가 null 또는 undefined일 때 처리
    const main = addresses.find((addr) => addr.isDefault);
    if (main) {
      setUserInfo((prev) => ({
        ...prev,
        address: `${main.addressLine1} ${main.addressLine2}`,
        phone: main.phoneNumber,
      }));
    }
  };

  const handleSetMain = (index: number) => {
    if (!addresses || addresses[index] === undefined) return; // addresses가 null 또는 index가 없을 때 처리
    setAddresses((prev) =>
      prev.map((addr, i) => ({
        ...addr,
        isDefault: i === index,
      }))
    );
    updateUserInfoFromMainAddress();
  };

  const handleDelete = (index: number) => {
    if (!addresses || addresses[index] === undefined) return; // addresses가 null 또는 index가 없을 때 처리
    const isMain = addresses[index].isDefault;
    const updated = addresses.filter((_, i) => i !== index);

    if (isMain && updated.length > 0) updated[0].isDefault = true;

    setAddresses([...updated]);
    if (updated.length === 0) {
      setUserInfo((prev) => ({
        ...prev,
        address: "",
        phone: "",
      }));
    }
  };

  const handleDeleteClick = (index: number) => {
    if (!addresses || addresses[index] === undefined) return; // addresses가 null 또는 index가 없을 때 처리
    if (addresses.length === 1) {
      setDeleteIndex(index);
      setDeleteConfirmOpen(true);
    } else {
      handleDelete(index);
    }
  };

  const handleAddAddress = (newAddress: DeliveryAddress) => {
    setAddresses((prev) => {
      const updated = newAddress.isDefault
        ? prev.map((a) => ({ ...a, isDefault: false }))
        : prev;
      return [...updated, newAddress];
    });
    setAddressModalOpen(false);
  };

  const handleSave = () => {
    updateUserInfoFromMainAddress(); // Update user profile from the selected main address
    setDialogOpen(false); // Close the dialog after saving the changes
  };

  return (
    <Card className="w-full p-4 mb-4 relative mx-auto">
      <div className="flex">
        {/* 좌측 아바타 */}
        <div className="mr-6 flex flex-col items-center w-24">
          <div className="ml-6 w-24 h-24 rounded-full border flex items-center justify-center text-3xl mr-6 overflow-hidden">
            {userInfo.imageUrl ? (
              <img
                src={userInfo.imageUrl}
                alt="사용자 이미지"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={40} className="text-gray-500" />
            )}
          </div>
          <div className="mt-2 text-sm font-semibold text-center">{userInfo.name}</div>
        </div>

        {/* 우측 정보 */}
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
      <div className="absolute bottom-4 right-8">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="text-sm h-8 bg-main">배송지 수정</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>배송지 목록</DialogTitle>
            </DialogHeader>

            <div className="mt-4 max-h-[400px] overflow-y-auto space-y-2">
              {addresses && addresses.length > 0 ? (
                addresses.map((addr, index) => (
                  <DeliveryAddressCard
                    key={index}
                    data={addr}
                    onDelete={() => handleDeleteClick(index)}
                    onSetMain={() => handleSetMain(index)}
                  />
                ))
              ) : (
                <p>배송지가 없습니다.</p>
              )}

              <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>배송지를 삭제하시겠습니까?</DialogTitle>
                    <DialogDescription>
                      배송지가 1개뿐입니다. 삭제하면 기본 배송지가 사라집니다.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
                      취소
                    </Button>
                    <Button
                      className="bg-destructive text-white"
                      onClick={() => {
                        if (deleteIndex !== null) handleDelete(deleteIndex);
                        setDeleteConfirmOpen(false);
                        setDeleteIndex(null);
                      }}
                    >
                      삭제
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* + 버튼 */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setAddressModalOpen(true)}
                className="w-8 h-8 border rounded-full text-xl flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <AddressModal
              isOpen={addressModalOpen}
              onClose={() => setAddressModalOpen(false)}
              onSave={(newAddress) => {
                handleAddAddress(newAddress);
              }}
            />

            <DialogFooter className="mt-4">
              <Button className="bg-main" onClick={handleSave}>
                저장
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}
