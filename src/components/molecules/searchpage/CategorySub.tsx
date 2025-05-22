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

export default function CategorySub({ categoryList }: { categoryList: AuctionCategory[] | null }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategoryMain = searchParams.get('mainCategoryId')
  const currentCategory = searchParams.get('subCategoryId') || ""
  
  // 카테고리 값 변경 시 URL 업데이트
  const handleCategoryChange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value) {
      params.set('subCategoryId', value)
      params.delete('detailCategoryId')
      params.delete('page')
    }
    
    router.replace(`/search?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  return (
    <div>
      <div className="text-sm text-gray-500">중분류</div>
      <Select value={currentCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="중분류 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categoryList?.filter((category) => category.parentId === parseInt(currentCategoryMain || "0")).map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}