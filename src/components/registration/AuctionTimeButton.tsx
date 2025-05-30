"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import toast from "react-hot-toast";

interface AuctionTimeButtonProps {
  value: { hour: number; minute: number };
  onChange: (value: { hour: number; minute: number }) => void;
}

export default function AuctionTimeButton({
                                            value,
                                            onChange,
                                          }: AuctionTimeButtonProps) {
  const [open, setOpen] = useState(false);
  const [tempHour, setTempHour] = useState(value.hour);
  const [tempMinute, setTempMinute] = useState(value.minute);

  const formattedTime =
    value.hour === 0 && value.minute === 0
      ? "경매 소요 시간 선택 (10분 ~ 24시간)"
      : `${value.hour.toString().padStart(2, "0")} 시간 ${value.minute
        .toString()
        .padStart(2, "0")} 분 동안 경매가 진행됩니다.`;

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  useEffect(() => {
    if (open) {
      setTempHour(value.hour);
      setTempMinute(value.minute);
    }
  }, [open, value.hour, value.minute]);

  const handleConfirm = () => {
    const totalMinutes = tempHour * 60 + tempMinute;
    if (totalMinutes < 10) {
      toast.error("경매 시간은 최소 10분 이상이어야 합니다.");
      return;
    }

    onChange({ hour: tempHour, minute: tempMinute });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle>
        <VisuallyHidden>경매 진행 시간 설정</VisuallyHidden>
      </DialogTitle>
      <DialogDescription>
        <VisuallyHidden>
          경매 진행 시간 을 시, 분 단위로 설정할 수 있습니다.
        </VisuallyHidden>
      </DialogDescription>
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
          <div className="absolute top-[calc(50%-20px)] w-full h-[40px] bg-main/10 z-10 rounded-lg" />

          <Swiper
            direction="vertical"
            slidesPerView={5}
            centeredSlides
            loop
            mousewheel
            freeMode
            onSlideChange={(swiper) => {
              const realIndex = swiper.realIndex % 24;
              setTempHour(realIndex);
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

          <Swiper
            direction="vertical"
            slidesPerView={5}
            centeredSlides
            loop
            mousewheel
            freeMode
            onSlideChange={(swiper) => {
              const realIndex = swiper.realIndex % 60;
              setTempMinute(realIndex);
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