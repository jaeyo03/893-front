"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
}

const formatPrice = (price: number) => {
  if (!price) return '';
  return price.toLocaleString('ko-KR')
}

export default function PriceFilter({ minPrice, maxPrice }: PriceFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentMinPrice, setCurrentMinPrice] = useState<number | null>(null)
  const [currentMaxPrice, setCurrentMaxPrice] = useState<number | null>(null)
  const searchParamsMinPrice = searchParams.get('minPrice')
  const searchParamsMaxPrice = searchParams.get('maxPrice')
  const isUserInput = currentMaxPrice !== null || currentMinPrice !== null

  const handleRangeChange = (values: { min: number | null; max: number | null }) => {
    setCurrentMinPrice(values.min)
    setCurrentMaxPrice(values.max)
  };
  
  const changePrice = (e: React.ChangeEvent<HTMLInputElement>, clickType: 'min' | 'max') => {
    const value = e.target.value.replace(/,/g, '');
    const numValue = parseInt(value) >= 0 ? parseInt(value) : null;
    
    if (clickType === 'min') {
      setCurrentMinPrice(numValue);
    } else {
      setCurrentMaxPrice(numValue);
    }
  }

  const handlePriceChangeApply = useCallback(() => {
    if (!currentMaxPrice) {
      alert('최대 가격을 입력해주세요.'); // TODO Toast로 변경
      return;
    }

    if (currentMinPrice !== null && currentMinPrice >= currentMaxPrice) {
      alert('최소 가격이 최대 가격보다 클 수 없습니다.'); // TODO Toast로 변경
      return;
    }

    const params = new URLSearchParams(searchParams.toString())
    params.set('minPrice', currentMinPrice?.toString() || '0')
    params.set('maxPrice', currentMaxPrice.toString())
    params.delete('page')
    router.replace(`/search?${params.toString()}`, { scroll: false })
  }, [currentMinPrice, currentMaxPrice, router, searchParams])
  
  useEffect(() => {
    if (searchParamsMaxPrice !== null) {
      const minPrice = searchParamsMinPrice ? parseInt(searchParamsMinPrice) : 0
      handleRangeChange({ min: minPrice, max: parseInt(searchParamsMaxPrice) })
    } else {
      handleRangeChange({ min: null, max: null })
    }
  }, [searchParams])

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2">
        <label htmlFor="price" className="font-bold text-md">
          경매 시작가
        </label>
      </div>
      <div className="px-4 py-2 flex gap-2 items-center justify-center">
        <input 
          className={`w-1/3 border-2 rounded-md p-1 ${isUserInput ? 'border-main' : 'border-gray-300'}`} 
          placeholder={searchParamsMinPrice ? formatPrice(parseInt(searchParamsMinPrice)) : formatPrice(minPrice)} 
          value={currentMinPrice !== null ? formatPrice(currentMinPrice) : ''} 
          onChange={(e) => changePrice(e, 'min')} 
          type="text"
          inputMode="numeric"
          min="0"
        />
        <div className="font-medium text-md">
          ~
        </div>
        <input 
          className={`w-1/3 border-2 rounded-md p-1 ${isUserInput ? 'border-main' : 'border-gray-300'}`} 
          placeholder={searchParamsMaxPrice ? formatPrice(parseInt(searchParamsMaxPrice)) : formatPrice(maxPrice)} 
          value={currentMaxPrice !== null ? formatPrice(currentMaxPrice) : ''} 
          onChange={(e) => changePrice(e, 'max')} 
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <Button size="default" variant="outline" onClick={handlePriceChangeApply} className={`${isUserInput ? 'bg-main text-white hover:bg-main/80 hover:text-white' : ''}`}>
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}