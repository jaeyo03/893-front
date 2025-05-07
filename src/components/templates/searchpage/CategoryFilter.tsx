"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export default function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') || ""
  
  // 카테고리 값 변경 시 URL 업데이트
  const handleCategoryChange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value) {
      params.set('category', value)
    } else {
      params.delete('category')
    }
    
    router.push(`/search?${params.toString()}`)
  }, [router, searchParams])
  
  return (
    <div className="border-b-[1px] border-divider">
      <div className="flex justify-between items-center px-4 py-2">
        <label htmlFor="category" className="font-bold text-md">
          카테고리
        </label>
      </div>
      <div className="px-4 py-2">
        <Select value={currentCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="digital">전자기기</SelectItem>
              <SelectItem value="fashion">패션/의류</SelectItem>
              <SelectItem value="furniture">가구/인테리어</SelectItem>
              <SelectItem value="hobby">취미</SelectItem>
              <SelectItem value="book">도서</SelectItem>
              <SelectItem value="food">식품</SelectItem>
              <SelectItem value="stationery">문구류</SelectItem>
              <SelectItem value="appliance">가전제품</SelectItem>
              <SelectItem value="mobility">이동장치</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}