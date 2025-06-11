'use client'

import { useState } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Image, Status } from "@/types/productData";

import AuctionImageCard from "./Product/AuctionImageCard"

interface ImageSliderProps{
  images: Image[];
  auctionState: Status;
}

export default function ImageSlider({images, auctionState} : ImageSliderProps){
  const initialIndex = Array.isArray(images)
  ? images.findIndex(image => image.imageSeq === 0) : -1;
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
    <div className="relative flex flex-col">
      <div className="relative w-[600px] h-[600px] group">
        <AuctionImageCard imageUrl={images[currentIndex]?.url || ''} label={auctionState}/>
        <div
          className="absolute top-0 left-0 h-full w-[150px] z-20 cursor-pointer flex items-center justify-start bg-transparent">
        <ChevronLeft
          size={40}
          onClick={goToPrev}
          className="absolute p-1 text-white transition-opacity duration-200 -translate-y-1/2 rounded-full opacity-0 top-1/2 left-12 bg-black/50 group-hover:opacity-100"/>
        </div>
        <div
          className="absolute top-0 right-0 h-full w-[150px] z-20 cursor-pointer flex items-center justify-end bg-transparent">
        <ChevronRight
          size={40}
          onClick={goToNext}
          className="absolute p-1 text-white transition-opacity duration-200 -translate-y-1/2 rounded-full opacity-0 top-1/2 right-4 bg-black/50 group-hover:opacity-100"/>
      </div>
        <div className="absolute z-30 flex space-x-2 -translate-x-1/2 bottom-4 left-1/2">
          {images.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === currentIndex ? 'bg-imageindex' : 'bg-rightgray'
                }`}
              />
          ))}
        </div>
      </div>
    </div>
  );
}
