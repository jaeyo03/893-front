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
import { getAddresses, getUserInfo,updateAddress, deleteAddress } from "@/lib/api/user";

export default function UserProfile() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    imageUrl: '',
  });

  // 초기값을 빈 배열로 설정하여 undefined 방어
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 두 API를 병렬로 호출
        const [addressData, userData] = await Promise.all([
          getAddresses(),
          getUserInfo()
        ]);
  
        // 주소 데이터 처리
        if (Array.isArray(addressData)) {
          setAddresses(addressData);
  
          // 대표 주소가 있다면 userInfo에 반영
          const mainAddress = addressData.find((addr) => addr.isDefault);
          console.log("유저 정보",userData);
          if (mainAddress) {
            setUserInfo(() => ({
              address: `${mainAddress.addressLine1} ${mainAddress.addressLine2}`,
              phone: mainAddress.phoneNumber,
              name: userData.name,          // ✅ 유저 기본정보도 업데이트
              email: userData.email,        // 예: 유저 이메일이 있다면
              imageUrl: userData.profileUrl,
            }));
          } else if (userData) {
            // 대표 주소가 없어도 userData는 반영
            setUserInfo((prev) => ({
              ...prev,
              imageUrl: userData.profileUrl,
              name: userData.name,
              email: userData.email,
            }));
          }
        } else {
          console.error("API에서 배열이 아닌 주소값 반환:", addressData);
        }
      } catch (error) {
        console.error("유저 정보 또는 배송지 불러오기 실패:", error);
      }
    };

  
    fetchData();
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

  const handleSetMain = async (index: number) => {
    const selectedAddress = addresses?.[index];
    if (!selectedAddress) return;
  
    try {
      // ✅ 서버에 대표 배송지 요청
      await updateAddress(selectedAddress.id);
  
      // ✅ 성공 시 상태 업데이트
      const updatedAddresses = addresses.map((addr, i) => ({
        ...addr,
        isDefault: i === index,
      }));
  
      setAddresses(updatedAddresses);
      updateUserInfoFromMainAddress();
    } catch (error) {
      console.error("대표 배송지 설정 실패:", error);
      // 알림이나 토스트 메시지를 띄워도 좋습니다
    }
  };

  const handleDelete = async (index: number) => {
    if (!addresses || addresses[index] === undefined) return;

    const addressToDelete = addresses[index];
    const isMain = addressToDelete.isDefault;

    try {
      // 🔥 서버에 삭제 요청
      await deleteAddress(addressToDelete.id);

      // 🔁 클라이언트 상태 업데이트
      const updated = addresses.filter((_, i) => i !== index);
      if (isMain && updated.length > 0) {
        updated[0].isDefault = true; // 클라이언트상에서 첫 번째를 대표로
      }

      setAddresses([...updated]);

      if (updated.length === 0) {
        setUserInfo((prev) => ({
          ...prev,
          address: "",
          phone: "",
        }));
      }
    } catch (error) {
      console.error("배송지 삭제 처리 중 오류:", error);
      // 필요 시 사용자에게 알림 처리 가능
    }
  };

  const handleDeleteClick = (index: number) => {
    if (!addresses || addresses[index] === undefined) return;
    if (addresses.length === 1) {
      setDeleteIndex(index);
      setDeleteConfirmOpen(true);
    } else {
      handleDelete(index); // 👉 await는 필요 없음, handleDelete 자체에서 처리
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
    <Card className="w-full p-8 mb-4 relative mx-auto shadow-none">
      <div className="flex">
        {/* 좌측 아바타 */}
        <div className="mr-12 flex flex-col items-center w-24">
          <div className="ml-6 w-24 h-24 rounded-full border flex items-center justify-center text-3xl mr-6 overflow-hidden">
            {userInfo.imageUrl ? (
              <img
                src={userInfo.imageUrl}
                alt= {userInfo.name}
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
            {userInfo.address ? (
              <p>{userInfo.address}</p>
            ) : (
              <p className="text-rose-500">대표 배송지를 설정해주세요</p>
            )}
          </div>
          <div className="text-sm">
            <p className="text-gray-500">전화번호</p>
            {userInfo.phone ? (
              <p>{userInfo.phone}</p>
            ) : (
              <p className="text-rose-500">대표 배송지를 설정해주세요</p>
            )}
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
