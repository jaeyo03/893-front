"use client";

import { useEffect, useRef, useState } from "react";
import { X, Trash2 } from "lucide-react";
import NotificationContents from "./NotificationContents";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { onMessageListener } from "@/lib/firebase-messaging";
import axios from "axios";
import toast from "react-hot-toast";

// dayjs 설정
dayjs.extend(relativeTime);
dayjs.locale("ko");

function convertTimeToDisplay(dateString: string) {
  const date = dayjs(dateString);
  const todayStart = dayjs().startOf("day");
  return date.isAfter(todayStart) ? date.fromNow() : date.format("MM월 DD일");
}

type Props = {
  onClose: () => void;
};

type Notification = {
  id: number;
  image: string;
  title: string;
  date: string;
  createdAt: string;
  category: "구매" | "판매" | "기타";
  content: string;
  auctionId: number;
  isRead: boolean;
};

export default function NotificationDropdown({ onClose }: Props) {
  const [selectedTab, setSelectedTab] = useState<"전체" | "구매" | "판매">(
    "전체"
  );
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [, setIsDimmed] = useState(false);
  const [optionTargetId, setOptionTargetId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await axios.get("/notifications");

        // console.log("✅ 응답 성공:", res.data);

        const list = res?.data?.data || [];
        // console.log("📦 알림 목록:", list);

        const formatted = list.map((n: any): Notification => {
          const typeList = n.subscriptionTypeList || [];

          // 디버깅용 로그
          // console.log(`🔔 ID ${n.id} 의 타입 목록:`, typeList);

          let category: "구매" | "판매" | "기타" = "기타";
          if (typeList.includes("SELLER")) {
            category = "판매";
          } else if (
            typeList.includes("BIDDER") ||
            typeList.includes("SCRAPPER")
          ) {
            category = "구매";
          }

          // console.log(`📌 분류된 category for ID ${n.id}:`, category);

          return {
            id: n.id,
            image: n.imageUrl,
            title: n.title,
            date: convertTimeToDisplay(n.createdAt),
            createdAt: n.createdAt,
            category,
            content: n.message || n.content || "",
            auctionId: n.auctionId,
            isRead: n.isRead,
          };
        });

        // console.log("🟢 변환된 알림 목록:", formatted);

        setNotifications(formatted);
      } catch (err: any) {
        console.error(
          "💥 알림 불러오기 실패:",
          err.response?.data || err.message
        );
        toast.error("알림을 불러오는 데 실패했습니다. 다시 시도해주세요.");
      }
    }

    fetchNotifications();
  }, []);

  useEffect(() => {
    onMessageListener()
      .then((payload: any) => {
        const { title, body } = payload.notification;
        const { category, image, auctionId } = payload.data || {};
        const newNotification: Notification = {
          id: Date.now(),
          image: image || "/images/default.png",
          title: title || "알림",
          date: "방금 전",
          createdAt: dayjs().toISOString(),
          category: category === "Buyer" ? "구매" : "판매",
          content: body || "",
          auctionId: auctionId ? parseInt(auctionId) : 0,
          isRead: false,
        };
        setNotifications((prev) => [newNotification, ...prev]);
      })
      .catch((err) => {
        // console.error("💥 FCM 수신 실패:", err);
        toast.error("알림 수신에 실패했습니다. 다시 시도해주세요.");
      });
  }, []);

  const handleDelete = async (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    try {
      await axios.delete(`/notifications/${id}`); // ✅ 경로 수정됨
      // console.log(`🗑️ 알림 ${id} 삭제 완료`);
    } catch (err) {
      // console.error("❌ 알림 삭제 실패", err);
      toast.error("알림 삭제에 실패했습니다. 다시 시도해주세요.");
    }
    setOptionTargetId(null);
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const todayStart = dayjs().startOf("day");

  const todayNotifications = notifications.filter(
    (n) =>
      dayjs(n.createdAt).isAfter(todayStart) &&
      (selectedTab === "전체" || n.category === selectedTab)
  );

  const pastNotifications = notifications.filter(
    (n) =>
      dayjs(n.createdAt).isBefore(todayStart) &&
      (selectedTab === "전체" || n.category === selectedTab)
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="absolute right-0 mt-2 w-[390px] h-[740px] bg-[#F5F6F8] border rounded-lg shadow-lg z-50 overflow-y-scroll no-scrollbar">
        {optionTargetId && (
          <div className="absolute inset-0 bg-black bg-opacity-30 z-40 pointer-events-none rounded-lg" />
        )}

        <header className="flex bg-white border-b z-50 p-4 justify-between items-center">
          <h2 className="text-[22px] font-bold text-[#1E1E23]">알림</h2>
          <button type="button" className="p-2" onClick={onClose}>
            <X className="w-[24px] h-[24px] text-[#1E1E23]" />
          </button>
        </header>

        {todayNotifications.length > 0 && (
          <div className="flex flex-col items-start w-full p-4">
            <div className="text-[#1E1E23] font-bold text-[19px] pt-[9px]">
              오늘 받은 알림
            </div>
            <div className="flex flex-col gap-5 items-center">
              {todayNotifications.map((n) => (
                <NotificationContents
                  key={n.id}
                  {...n}
                  setDimmed={setIsDimmed}
                  markAsRead={markAsRead}
                  onRequestOptions={() => setOptionTargetId(n.id)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="w-full px-4 pt-4">
          <div className="text-[#1E1E23] font-bold text-[19px] pt-[9px] pb-[10px]">
            이전 알림
          </div>

          <div className="flex space-x-4 mb-4">
            {["전체", "구매", "판매"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab as any)}
                className={`w-[60px] h-[37px] px-4 py-2 rounded-[17px] border ${
                  selectedTab === tab
                    ? "bg-[#4173F51A] text-alarmcategory border-[#4173F54D] font-bold text-[14px]"
                    : "bg-white text-[#545454] border-[#E6E6EA] text-[14px] font-normal"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-5 items-center">
            {pastNotifications.map((n) => (
              <NotificationContents
                key={n.id}
                {...n}
                setDimmed={setIsDimmed}
                markAsRead={markAsRead}
                onRequestOptions={() => setOptionTargetId(n.id)}
              />
            ))}
          </div>
        </div>

        {optionTargetId && (
          <div className="absolute bottom-4 w-full px-4 space-y-2 z-50">
            <div className="w-full h-[60px] bg-white border shadow-sm rounded-[12px]">
              <button
                onClick={() => handleDelete(optionTargetId)}
                className="flex justify-start items-center px-4 py-2 w-full h-full font-bold text-main hover:bg-gray-400/10 rounded-[12px]"
              >
                <Trash2 className="mr-2" size={20} /> 삭제하기
              </button>
            </div>
            <div className="w-full h-[43px] bg-white border shadow-sm rounded-[12px]">
              <button
                onClick={() => setOptionTargetId(null)}
                className="flex items-center justify-center px-4 py-2 w-full h-full font-normal text-main hover:bg-gray-400/10 rounded-[12px]"
              >
                닫기
              </button>
            </div>
          </div>
        )}

        <footer className="flex justify-center items-center pt-6 text-main text-[13px] font-normal">
          최근 7일 동안 받은 알림을 모두 확인했습니다.
        </footer>
      </div>
    </div>
  );
}
