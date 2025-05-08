import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";

export default function AuctionTimeButton() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [open, setOpen] = useState(false);

  const formattedTime =
    hour === 0 && minute === 0
      ? "경매 소요 시간 선택 (10분 ~ 24시간)"
      : `${hour.toString().padStart(2, "0")} 시간 ${minute
          .toString()
          .padStart(2, "0")} 분 동안 경매가 진행됩니다.`;

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleConfirm = () => {
    const totalMinutes = hour * 60 + minute;
    if (totalMinutes < 10) {
      alert("경매 시간은 최소 10분 이상이어야 합니다.");
      return;
    }

    alert(
      `${hour.toString().padStart(2, "0")} 시간간 ${minute
        .toString()
        .padStart(2, "0")} 분 동안 경매가 진행됩니다.`
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="w-[560px] h-[50px] bg-white border border-registerline text-resgistertext text-[16px] font-thin rounded-[6px] px-[16px] shadow-none text-left hover:bg-divider"
        >
          {formattedTime}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[200px] h-[400px] p-4 flex flex-col justify-between items-center">
        <div className="relative flex items-center justify-center gap-2 pt-6">
          {/* 중앙 강조 영역 */}
          <div className="absolute top-[calc(50%-20px)] w-full h-[40px] bg-main/10 z-10 rounded-lg" />

          {/* 시 Swiper */}
          <Swiper
            direction="vertical"
            slidesPerView={5}
            centeredSlides
            loop
            mousewheel
            freeMode
            onSlideChange={(swiper) => {
              const realIndex = swiper.realIndex % 24;
              setHour(realIndex);
            }}
            className="h-[280px] w-[80px]"
          >
            {hours.map((h) => (
              <SwiperSlide
                key={`hour-${h}`}
                className="text-center text-[19px] font-medium"
              >
                {h.toString().padStart(2, "0")}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 분 Swiper */}
          <Swiper
            direction="vertical"
            slidesPerView={5}
            centeredSlides
            loop
            mousewheel
            freeMode
            onSlideChange={(swiper) => {
              const realIndex = swiper.realIndex % 60;
              setMinute(realIndex);
            }}
            className="h-[280px] w-[80px]"
          >
            {minutes.map((m) => (
              <SwiperSlide
                key={`minute-${m}`}
                className="text-center text-[19px] font-medium"
              >
                {m.toString().padStart(2, "0")}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <DialogFooter className="flex w-full gap-2 pt-4 border-t">
          <Button
            className="w-full bg-white shadow-none text-regustrertimemodaltext font-medium text-[19px] hover:text-main/80 hover:bg-white border-none"
            onClick={() => setOpen(false)}
          >
            닫기
          </Button>
          <Button
            className="w-full bg-white shadow-none text-main font-medium text-[19px] hover:text-main/50 hover:bg-white border-none"
            onClick={handleConfirm}
          >
            적용
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
