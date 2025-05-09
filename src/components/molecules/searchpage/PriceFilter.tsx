"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import PriceRangeSlider from "@/components/atoms/searchpage/PriceRangeSlider";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PriceFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentMinPrice, setCurrentMinPrice] = useState(parseInt(searchParams.get('priceMin') || '5000'))
  const [currentMaxPrice, setCurrentMaxPrice] = useState(parseInt(searchParams.get('priceMax') || '60000'))
  const minValueRef = useRef(currentMinPrice);
  const maxValueRef = useRef(currentMaxPrice);
  
  const handleRangeChange = (values: { min: number; max: number }) => {
    setCurrentMinPrice(values.min)
    setCurrentMaxPrice(values.max)
    minValueRef.current = values.min
    maxValueRef.current = values.max
  };
  
  const handlePriceChangeApply = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (currentMinPrice && currentMaxPrice) {
      params.set('priceMin', currentMinPrice.toString())
      params.set('priceMax', currentMaxPrice.toString())
    }
    router.replace(`/search?${params.toString()}`)
  }, [currentMinPrice, currentMaxPrice, router, searchParams])
  
  useEffect(() => {
    if (searchParams.get('priceMin') === null || searchParams.get('priceMax') === null) {
      handleRangeChange({ min: 5000, max: 60000 })
    }
  }, [searchParams])

  return (
    <div className="border-b-[1px] border-divider">
      <div className="flex justify-between items-center px-4 py-2">
        <label htmlFor="price" className="font-bold text-md">
          경매 시작가
        </label>
      </div>
      <div className="px-4 py-2">
        <PriceRangeSlider
          min={0}
          max={100000}
          minValue={currentMinPrice}
          maxValue={currentMaxPrice}
          setMinValue={setCurrentMinPrice}
          setMaxValue={setCurrentMaxPrice}
          minValueRef={minValueRef}
          maxValueRef={maxValueRef}
          onChange={handleRangeChange}
        />
        <Button size="sm" variant="outline" onClick={handlePriceChangeApply} className="mt-10">적용</Button>
      </div>
    </div>
  )
}