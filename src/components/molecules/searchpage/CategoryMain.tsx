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
import { AuctionCategory } from "@/types/productData";

export default function CategoryMain({ categoryList }: { categoryList: AuctionCategory[] | null }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('mainCategoryId') || ""
  
  // 카테고리 값 변경 시 URL 업데이트
  const handleCategoryChange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set('mainCategoryId', value)
      params.delete('subCategoryId')
      params.delete('detailCategoryId')
      params.delete('page')
    }
    
    router.replace(`/search?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  return (
    <div>
      <div className="text-sm text-gray-500">대분류</div>
      <Select value={currentCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="대분류 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categoryList?.filter((category) => category.parentId === null).map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}