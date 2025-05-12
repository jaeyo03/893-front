import { useEffect, useRef, useState } from "react";
import { X, Trash2 } from "lucide-react";
import NotificationContents from "./NotificationContents";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { onMessageListener } from "@/lib/firebase-messaging";

// ✅ dayjs 플러그인 초기화
dayjs.extend(relativeTime);
dayjs.locale("ko");

// ✅ 날짜를 '방금 전' 또는 'MM월 DD일' 형식으로 변환
function convertTimeToDisplay(dateString: string) {
  const date = dayjs(dateString);
  const todayStart = dayjs().startOf("day");
  return date.isAfter(todayStart) ? date.fromNow() : date.format("MM월 DD일");
}

// ✅ 외부로부터 전달받는 props 타입
type Props = {
  onClose: () => void;
};

// ✅ 알림 객체 타입 정의
type Notification = {
  id: number;
  notificationType: "Buyer" | "Seller";
  title: string;
  content: string;
  createdAt: string;
  auctionId: number;
  isRead: boolean;
  thumbnailUrl: string;
};

export default function NotificationDropdown({ onClose }: Props) {
  // ✅ 탭 선택 상태 (전체 / 구매 / 판매)
  const [selectedTab, setSelectedTab] = useState<"전체" | "구매" | "판매">(
    "전체"
  );

  // ✅ 알림 리스트 상태
  const [notifications, setNotifications] = useState<any[]>([]);

  // ✅ 알림 내 옵션 버튼 열림 여부 → 배경 dim 처리용
  const [isDimmed, setIsDimmed] = useState(false);

  // ✅ 현재 옵션이 열린 알림의 ID
  const [optionTargetId, setOptionTargetId] = useState<number | null>(null);

  // ✅ 바깥 클릭 감지를 위한 참조
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ 최초 진입 시 기존 알림 목록 불러오기 (백엔드 API 호출)
  useEffect(() => {
    async function fetchNotifications() {
      const res = await fetch("/api/notification");
      const data = await res.json();
      const list = data.data.notificationList;
      const formatted = list.map((n: Notification) => ({
        id: n.id,
        image: n.thumbnailUrl,
        title: n.title,
        date: convertTimeToDisplay(n.createdAt),
        createdAt: n.createdAt,
        category: n.notificationType === "Buyer" ? "구매" : "판매",
        content: n.content,
        auctionId: n.auctionId,
        isRead: n.isRead,
      }));
      setNotifications(formatted);
    }
    fetchNotifications();
  }, []);

  // ✅ FCM 실시간 알림 수신 처리
  useEffect(() => {
    onMessageListener()
      .then((payload: any) => {
        const { title, body } = payload.notification;
        const { category, image, auctionId } = payload.data || {};
        const newNotification = {
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
        console.error("💥 FCM 수신 실패:", err);
      });
  }, []);

  // ✅ 알림 삭제
  const handleDelete = async (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    try {
      await fetch(`/api/notification/${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("삭제 실패", err);
    }
    setOptionTargetId(null);
  };

  // ✅ 알림 읽음 처리
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // ✅ 오늘 기준으로 알림 분류
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
      <div className="absolute right-0 mt-2 w-[390px] h-[740px] bg-[#F5F6F8] border rounded-lg shadow-lg z-50 overflow-y-auto">
        {/* ✅ 삭제 버튼이 열렸을 때 배경 블라인드 처리 */}
        {optionTargetId && (
          <div className="absolute inset-0 bg-black bg-opacity-30 z-40 pointer-events-none rounded-lg" />
        )}

        {/* ✅ 상단 헤더 */}
        <header className="flex bg-white border-b z-50 p-4 justify-between items-center">
          <h2 className="text-[22px] font-bold text-[#1E1E23]">알림</h2>
          <button type="button" className="p-2" onClick={onClose}>
            <X className="w-[24px] h-[24px] text-[#1E1E23]" />
          </button>
        </header>

        {/* ✅ 오늘 받은 알림 섹션 */}
        {todayNotifications.length > 0 && (
          <div className="flex flex-col items-start w-full p-4">
            <div className="text-[#1E1E23] font-bold text-[19px] pt-[9px]">
              오늘 받은 알림
            </div>
            <div className="flex flex-col gap-5 w-full">
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

        {/* ✅ 이전 알림 섹션 */}
        <div className="w-full px-4 pt-4">
          <div className="text-[#1E1E23] font-bold text-[19px] pt-[9px] pb-[10px]">
            이전 알림
          </div>

          {/* 탭 버튼 (전체 / 구매 / 판매) */}
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

          {/* 이전 알림 리스트 */}
          <div className="flex flex-col gap-5 w-full">
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

        {/* ✅ 하단 고정 삭제/닫기 버튼 */}
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

        {/* ✅ 하단 안내 문구 */}
        <footer className="flex justify-center items-center pt-6 text-main text-[13px] font-normal">
          최근 7일 동안 받은 알림을 모두 확인했습니다.
        </footer>
      </div>
    </div>
  );
}
