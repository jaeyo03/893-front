"use client"
import { useCallback, useEffect, useRef, MutableRefObject } from "react"

interface PriceRangeSliderProps {
  min: number;
  max: number;
  trackingColor?: string;
  rangeColor?: string;
  onChange: (values: { min: number; max: number }) => void;
  width?: string;
  setMinValue: (min: number) => void;
  setMaxValue: (max: number) => void;
  minValue: number;
  maxValue: number;
  minValueRef: MutableRefObject<number>;
  maxValueRef: MutableRefObject<number>;
}

export default function PriceRangeSlider({
  min,
  max,
  trackingColor = "#CECECE",
  rangeColor = "#0064FF",
  onChange,
  width = "220px",
  setMinValue,
  setMaxValue,
  minValue,
  maxValue,
  minValueRef,
  maxValueRef,
}: PriceRangeSliderProps) {
  const rangeRef =  useRef<HTMLDivElement>(null);

  // percentage 계산
  const getPercentage = useCallback(
    (value : number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )
  
  const convertPrice = (price : number) : string => {
    if (price === 100000) {
      return "100,000+"
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // 왼쪽 범위 너비 조절
  useEffect(() => {
    const minPercentage = getPercentage(minValue);
    const maxPercentage = getPercentage(maxValueRef.current);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercentage}%`;
      rangeRef.current.style.width = `${maxPercentage - minPercentage}%`;
    }
  }, [minValue, getPercentage, maxValueRef])

  // 오른쪽 범위 너비 조절
  useEffect(() => {
    const minPercentage = getPercentage(minValueRef.current);
    const maxPercentage = getPercentage(maxValue);
    
    if (rangeRef.current) {
      rangeRef.current.style.width = `${maxPercentage - minPercentage}%`;
    }
  },[maxValue, getPercentage, minValueRef])


  // 최소, 최대 값 변경 시 값 저장
  useEffect(() => {
    if (minValue != minValueRef.current || maxValue != maxValueRef.current) {
      onChange({min : minValue, max : maxValue});
      minValueRef.current = minValue;
      maxValueRef.current = maxValue;
    }
  },[onChange, minValue, maxValue, minValueRef, maxValueRef])
  
  
  return (
    <div className='w-full flex items-center justify-center flex-col space-y-5'>

      {/* 가격 표시 */}
      <div className="w-[260px] px-4 flex items-center justify-between gap-x-5 text-lg text-[#121212]">

        <p>
          {convertPrice(minValue)} 원
        </p>

        <div className="flex-1 border-dashed border border-neutral-500 mt-1"></div>

        <p>
          {convertPrice(maxValue)} 원
        </p>

      </div>


      {/* 가격 범위 슬라이더 */}
      <div style={{ width }}>

        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxValue - 1);
            setMinValue(value);
          }}
          className="thumb thumb-left"
          style={{
            width,
            zIndex: minValue > max - 100 || minValue === maxValue ? 5 : undefined,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minValue + 1);
            setMaxValue(value);
          }}
          className="thumb thumb-right"
          style={{
            width,
            zIndex: minValue > max - 100 || minValue === maxValue ? 4 : undefined,
          }}
        />

        <div className="slider">
          <div
            style={{ backgroundColor: trackingColor }}
            className="track-slider"
          />

          <div
            ref={rangeRef}
            style={{ backgroundColor: rangeColor }}
            className="range-slider"
          />

        </div>

      </div>

    </div>
  );
}