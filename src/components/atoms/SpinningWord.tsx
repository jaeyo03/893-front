"use client"

import {useEffect, useState} from "react";
import { cn } from "@/lib/utils"

const rotatingWords = ['아이폰', '갤럭시', '한정판 신발', '에어팟 ', '맥북']

export default function SpinningWord() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
        setIsAnimating(false);
      },500)
    }, 3000)

    return () => clearInterval(rotateInterval);
  },[])

  return (
    <span className="inline-block relative overflow-hidden text-[#B3B3B4]">
      <span
        className={cn(
          "inline-block transition-all duration-1000",
          isAnimating ? "-translate-y-full opacity-5" : "transform translate-y-0 opacity-100",
        )}
      >
        {rotatingWords[currentIndex]}
      </span>
    </span>
  )
}