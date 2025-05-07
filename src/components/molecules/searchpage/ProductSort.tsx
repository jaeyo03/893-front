"use client"

import SortButton from "@/components/atoms/searchpage/SortButton";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function ProductSort() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort')

  const handleSortChange = useCallback((sort: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (sort) {
      params.set('sort', sort)
    } else {
      params.delete('sort')
    }

    router.push(`/search?${params.toString()}`)
  }, [router, searchParams])

  return (
    <div className="bg-white rounded-[12px] py-2"> 
      <div className="font-semibold text-md border-b-[1px] border-divider px-4 py-2 h-10 flex items-center">
        정렬 기준 선택
      </div>
      <div className="px-4 py-2 flex items-center gap-4 h-10">
        <SortButton label="최신순" selected={currentSort === 'newest'} onClick={() => handleSortChange('newest')} />
        <div className="w-1 h-1 bg-neutral-400/60" />
        <SortButton label="낮은 시작 가격순" selected={currentSort === 'lowest'} onClick={() => handleSortChange('lowest')} />
        <div className="w-1 h-1 bg-neutral-400/60" />
        <SortButton label="높은 시작 가격순" selected={currentSort === 'highest'} onClick={() => handleSortChange('highest')} />
        <div className="w-1 h-1 bg-neutral-400/60" />
        <SortButton label="입찰자순" selected={currentSort === 'bidders'} onClick={() => handleSortChange('bidders')} />
        <div className="w-1 h-1 bg-neutral-400/60" />
        <SortButton label="찜순" selected={currentSort === 'likes'} onClick={() => handleSortChange('likes')} />
      </div>
    </div>
  )
}