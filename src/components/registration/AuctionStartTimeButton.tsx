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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { useState, useEffect } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
// ✅ props 기반 구조
interface AuctionStartTimeButtonProps {
  value: { hour: number; minute: number };
  onChange: (value: { hour: number; minute: number }) => void;
  disabled?: boolean; // 수정페이지일 경우 비활성화 처리용
}

export default function AuctionStartTimeButton({
                                                 value,
                                                 onChange,
                                                 disabled = false,
                                               }: AuctionStartTimeButtonProps) {
  const [open, setOpen] = useState(false);
  const [tempHour, setTempHour] = useState(value.hour);
  const [tempMinute, setTempMinute] = useState(value.minute);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const formattedTime =
    value.hour === 0 && value.minute === 0
      ? "경매 시작 시간 (최대 24시간)"
      : `${value.hour.toString().padStart(2, "0")} 시간 ${value.minute
        .toString()
        .padStart(2, "0")} 분 후 경매가 시작됩니다.`;

  useEffect(() => {
    if (disabled) {
      onChange({ hour: 0, minute: 0 });
    }
  }, [disabled, onChange]);

  useEffect(() => {
    if (open) {
      setTempHour(value.hour);
      setTempMinute(value.minute);
    }
  }, [open, value.hour, value.minute]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle>
        <VisuallyHidden>경매 시간 설정</VisuallyHidden>
      </DialogTitle>
      <DialogDescription>
        <VisuallyHidden>
          경매 시간 을 시, 분 단위로 설정할 수 있습니다.
        </VisuallyHidden>
      </DialogDescription>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          onClick={() => setOpen(true)}
          className="w-[560px] h-[50px] bg-white border border-registerline text-resgistertext text-[16px] font-thin rounded-[6px] px-[16px] shadow-none text-left hover:bg-divider"
        >
          {formattedTime}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[200px] h-[400px] p-4 flex flex-col justify-between items-center">
        <div className="relative flex items-center justify-center gap-2 pt-6">
          <div className="absolute top-[calc(50%-20px)] w-full h-[40px] bg-main/10 z-10 rounded-lg" />

          {/* 시 선택 */}
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

          {/* 분 선택 */}
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
            onClick={() => {
              onChange({ hour: tempHour, minute: tempMinute });
              setOpen(false);
            }}
          >
            적용
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}