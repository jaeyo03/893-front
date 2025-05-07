"use client"

import { useRouter, useSearchParams } from "next/navigation";
import FilterFieldSet from "../../molecules/searchpage/FilterFieldSet";
import FilterCheckBox from "../../atoms/searchpage/FilterCheckBox";
import { useCallback } from "react";

export default function AuctionStatusFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentAuctionStatus = searchParams.getAll('auctionStatus')

  // 체크박스 상태에 따라 URL 업데이트
  const handleAuctionStatusChange = useCallback((value: string, isChecked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (isChecked) {
      if (!currentAuctionStatus.includes(value)) {
        params.append('auctionStatus', value)
      }
    } else {
      // 체크 해제된 경우 해당 값만 제거
      params.delete('auctionStatus') // 먼저 모든 auctionStatus 제거
      
      // 체크 해제된 값을 제외한 나머지 값들 다시 추가
      currentAuctionStatus.forEach(status => {
        if (status !== value) {
          params.append('auctionStatus', status)
        }
      })
    }
    
    router.push(`/search?${params.toString()}`)
  }, [router, currentAuctionStatus, searchParams])
  
  return (
    <div className="border-b-[1px] border-divider">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="font-bold text-md">
          경매 진행 여부
        </div>
      </div>
      <div className="px-4 py-2"> 
        <FilterFieldSet>
            <FilterCheckBox id="before" name="before" label="시작 전" checked={currentAuctionStatus.includes("before")} onChange={handleAuctionStatusChange}  />
            <FilterCheckBox id="progress" name="progress" label="진행중" checked={currentAuctionStatus.includes("progress")} onChange={handleAuctionStatusChange}/>
            <FilterCheckBox id="finish" name="finish" label="경매 완료" checked={currentAuctionStatus.includes("finish")} onChange={handleAuctionStatusChange}/>
        </FilterFieldSet>
      </div>
    </div>
  )
}