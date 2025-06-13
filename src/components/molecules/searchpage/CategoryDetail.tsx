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

export default function CategoryDetail({ categoryList }: { categoryList: AuctionCategory[] | null }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('detailCategoryId') || ""
  const currentCategorySub = searchParams.get('subCategoryId') || ""
  const detailCategoryList = categoryList?.filter((category) => category.parentId === parseInt(currentCategorySub || "0"))

  // 카테고리 값 변경 시 URL 업데이트
  const handleCategoryChange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value) {
      params.set('detailCategoryId', value)
      params.delete('page')
    } else {
      params.delete('detailCategoryId')
    }
    
    router.replace(`/search?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  if (!detailCategoryList || detailCategoryList.length === 0) return null;

  return (
    <div>
      <div className="text-sm text-gray-500">소분류</div>
      <Select value={currentCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="소분류 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {detailCategoryList?.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}