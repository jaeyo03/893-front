import CategoryFilter from "@/components/templates/searchpage/CategoryFilter";
import { getCategoryList } from "@/lib/api/search";

export default async function CategoryFilterWrapper() {
  const categoryList = await getCategoryList();

  return (
    <div>
      <CategoryFilter categoryList={categoryList.data}/>
    </div>
  )
}