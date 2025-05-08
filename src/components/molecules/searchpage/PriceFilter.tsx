"use client"

import { useState } from "react";

export default function PriceFilter() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(11);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMinPrice(parseInt(value));
  }

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMaxPrice(parseInt(value));
  }

  return (
    <div className="border-b-[1px] border-divider">
      <div className="flex justify-between items-center px-4 py-2">
        <label htmlFor="price" className="font-bold text-md">
          경매 시작가
        </label>
        <div className="text-sm text-gray-500">
          {minPrice} - {maxPrice}
        </div>
      </div>
      <div className="px-4 py-2">
        <input className="w-full" type="range" id="price" name="price" min="0" max={maxPrice} value={minPrice} step="100" onChange={handleMinPriceChange} style={{ transform: "scaleX(-1)" }}/>
        <input className="w-full" type="range" id="price" name="price" min={minPrice} max="100000" value={maxPrice} step="100" onChange={handleMaxPriceChange} />
      </div>
    </div>
  )
}