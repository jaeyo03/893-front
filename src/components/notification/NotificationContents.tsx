import { EllipsisVertical, Trash2, Dot } from "lucide-react";
import { useState, useEffect } from "react";

type NotificationProps = {
  id: number;
  image: string;
  title: string;
  date: string;
  category: string;
  content: string;
  onDelete: (id: number) => void;
  setDimmed: (dimmed: boolean) => void;
};

export default function NotificationContents({
  id,
  image,
  title,
  date,
  category,
  content,
  onDelete,
  setDimmed,
}: NotificationProps) {
  const [showOptions, setShowOptions] = useState(false);

  // showOptions 상태에 따라 dimmed 처리
  useEffect(() => {
    setDimmed(showOptions);
  }, [showOptions, setDimmed]);

  return (
    <div className="flex flex-col items-start p-4 w-[349px] h-[107px] bg-white rounded-xl border-alarmborder shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      {showOptions && (
        <div className="absolute inset-0 bg-white/60 z-10 rounded-xl transition-opacity" />
      )}

      <div className="flex flex-row items-center justify-between w-full">
        <img
          src={image}
          alt=""
          className="w-[26px] h-[26px] rounded-2xl object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-row">
              <h2 className="text-[15px] font-bold text-[#1E1E23] pl-2 truncate">
                {" "}
                {/* 최대 10글자 까지 보여주기  */}
                {title.length > 10 ? `${title.slice(0, 10)}...` : title}
              </h2>
              <div className="flex items-center">
                <Dot className="text-alarmdot" />
              </div>
              <div className="flex flex-row justify-center items-center text-[13px] font-normal text-alarmkeyword">
                {date}
                <Dot className="text-alarmdot" />
                {category}
              </div>
            </div>
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="text-alarmkeyword hover:opacity-60"
            >
              <EllipsisVertical size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="text-[14px] text-[#303038] font-normal mt-[12px]">
        "{content}"
      </div>
      {showOptions && (
        <>
          {/* 삭제 버튼 - 중앙 하단 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-16 w-[350px] h-[60px] bg-white border shadow-sm rounded-[12px] z-50">
            <button
              onClick={() => onDelete(id)}
              className="flex justify-start items-center px-4 py-2 w-full h-full font-bold text-main hover:bg-gray-400/10 rounded-[12px]"
            >
              <Trash2 className="mr-2" size={20} />
              삭제하기
            </button>
          </div>

          {/* 닫기 버튼 - 삭제 버튼보다 더 아래 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 w-[350px] h-[43px] bg-white border shadow-sm rounded-[12px] z-50">
            <button
              onClick={() => setShowOptions(false)}
              className="flex items-center justify-center px-4 py-2 w-full h-full  font-normal text-main hover:bg-gray-400/10 rounded-[12px]"
            >
              닫기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
