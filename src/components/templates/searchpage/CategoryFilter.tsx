"use client"

import CategoryMain from "@/components/molecules/searchpage/CategoryMain"
import CategorySub from "@/components/molecules/searchpage/CategorySub"
import CategoryDetail from "@/components/molecules/searchpage/CategoryDetail"
import { useSearchParams } from "next/navigation"

export default function CategoryFilter() {
  const searchParams = useSearchParams()
  const currentCategoryMain = searchParams.get('mainCategoryId')
  const currentCategorySub = searchParams.get('subCategoryId')

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2">
        <label htmlFor="category" className="font-bold text-md">
          카테고리
        </label>
      </div>
      <div className="grid gap-2 px-4 py-2">
        <CategoryMain/>
        {currentCategoryMain && <CategorySub/>}
        {currentCategorySub && <CategoryDetail/>}
      </div>
    </div>
  )
}