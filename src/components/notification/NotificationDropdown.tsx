import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import NotificationContents from "./NotificationContents";

type Props = {
  onClose: () => void;
};

export default function NotificationDropdown({ onClose }: Props) {
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"전체" | "구매" | "판매">(
    "전체"
  );
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      image: "/images/신짱구.png",
      title: "스타벅스 텀블러",
      date: "4시간 전",
      category: "구매",
      content: "[사용자명]님이 [금액]에 입찰하셨습니다.",
    },
    // {
    //   id: 2,
    //   image: "/images/sample2.png",
    //   title: "애플워치 3세대 44MM 팜ㅍㅍㅍㅍㅍㅍㅍㅍㅍㅍ",
    //   date: "4월22일일",
    //   category: "판매",
    //   content: "경매 종료까지 [X]분 남았습니다.",
    // },
  ]);
  const [isDimmed, setIsDimmed] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const filteredNotifications = notifications.filter((n) => {
    if (selectedTab === "전체") return true;
    return n.category === selectedTab;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose(); // 드롭다운 외부 클릭 시 닫기
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    // 여기에 백엔드 API 호출 추가 예정
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <div className="absolute right-0 mt-2 w-[390px] h-[740px] bg-[#F5F6F8] border rounded-lg shadow-lg z-50 overflow-y-auto">
        <header className="flex top-0 left-0 right-0 bg-white border-b z-50">
          <div className="flex items-center justify-between w-full p-4">
            <h2 className="text-[22px] font-bold text-[#1E1E23]">알림</h2>
            <button type="button" className="ml-auto p-2" onClick={onClose}>
              <X className="w-[24px] h-[24px] text-[#1E1E23]" />
            </button>
          </div>
        </header>
        <div className="flex flex-col items-start justify-between w-full p-4">
          <div className="text-[#1E1E23] font-bold text-[19px] pt-[9px]">
            오늘 받은 알림
          </div>
          <div className="flex flex-col items-center justify-between p-4 gap-5 w-full">
            {notifications.length === 0 ? (
              <p className="text-[#1E1E23]">알림이 없습니다.</p>
            ) : (
              notifications.map((notification) => (
                <NotificationContents
                  key={notification.id}
                  id={notification.id}
                  image={notification.image}
                  title={notification.title}
                  date={notification.date}
                  category={notification.category}
                  content={notification.content}
                  onDelete={handleDelete}
                  setDimmed={setIsDimmed}
                />
              ))
            )}
          </div>
        </div>
        {/* ////////이전 알림 섹션/////// */}
        <div className="w-full px-4 pt-4">
          {/* 탭 버튼 */}
          <div className="text-[#1E1E23] font-bold text-[19px] pt-[9px] pb-[10px]">
            이전 알림
          </div>
          <div className="flex space-x-4 mb-4">
            {["전체", "구매", "판매"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab as "전체" | "구매" | "판매")}
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

          {/* 알림 리스트 */}
          <div className="flex flex-col items-center justify-between p-4 gap-5 w-full">
            {filteredNotifications.length === 0 ? (
              <p className="text-[#1E1E23]">알림이 없습니다.</p>
            ) : (
              filteredNotifications.map((notification) => (
                <NotificationContents
                  key={notification.id}
                  id={notification.id}
                  image={notification.image}
                  title={notification.title}
                  date={notification.date}
                  category={notification.category}
                  content={notification.content}
                  onDelete={handleDelete}
                  setDimmed={setIsDimmed}
                />
              ))
            )}
          </div>
        </div>
        <footer className="flex justify-center items-center bottom-[40px] left-0 right-0 z-50 text-main text-[13px] font-normal">
          최근 7일 동안 받은 알림을 모두 확인했습니다.
        </footer>
      </div>
    </div>
  );
}

// 삭제 모달
// 헤더 알림 아이콘 적용
// 알림 아이콘 클릭 시 드롭다운 열기
// 무한 스크롤
// 알림 내용 클릭 시 상세 페이지로 이동
// 알림 내용 클릭 시 읽음 처리 API 호출
// 알림 삭제 모달
// 알림 삭제 기능
// 알림 삭제 API 호출
// 백엔드 데이터 확인
// 시간 24시간 기준? 일자 기준?
// 시간 변환 -> 1시간 전, 4월 22일 등 <-- 백에서 어떻게 보내주는지 확인 필요
// 내가 보내줘야 하는 데이터는 무엇인지 확인 필요
