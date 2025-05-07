"use client"

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import FilterCheckBox from "../../atoms/searchpage/FilterCheckBox";
import FilterFieldSet from "../../molecules/searchpage/FilterFieldSet";
import { useCallback } from "react";

export default function ProductStatusFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentProductStatus = searchParams.getAll('productStatus')

  // 체크박스 상태에 따라 URL 업데이트
  const handleProductStatusChange = useCallback((value: string, isChecked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (isChecked) {
      if (!currentProductStatus.includes(value)) {
        params.append('productStatus', value)
      }
    } else {
      // 체크 해제된 경우 해당 값만 제거
      params.delete('productStatus') // 먼저 모든 productStatus 제거
      
      // 체크 해제된 값을 제외한 나머지 값들 다시 추가
      currentProductStatus.forEach(status => {
        if (status !== value) {
          params.append('productStatus', status)
        }
      })
    }
    
    router.push(`/search?${params.toString()}`)
  }, [router, currentProductStatus, searchParams])
  
  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2">
        <div className="font-bold text-md">
          물품 상태
        </div>
      </div>
      <div className="px-4 py-2 w-full">
        <FilterFieldSet>
            <FilterCheckBox id="new" name="new" label="새상품" checked={currentProductStatus.includes('new')} onChange={handleProductStatusChange}/>
            <FilterCheckBox id="no-use" name="no-use" label="사용감 없음" checked={currentProductStatus.includes('no-use')} onChange={handleProductStatusChange}/>
            <FilterCheckBox id="light-use" name="light-use" label="사용감 적음" checked={currentProductStatus.includes('light-use')} onChange={handleProductStatusChange}/>
            <FilterCheckBox id="heavy-use" name="heavy-use" label="사용감 많음" checked={currentProductStatus.includes('heavy-use')} onChange={handleProductStatusChange}/>
            <FilterCheckBox id="broken" name="broken" label="고장/파손" checked={currentProductStatus.includes('broken')} onChange={handleProductStatusChange}/>
        </FilterFieldSet>
      </div>
    </div>
  )
}