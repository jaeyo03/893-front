import { getRelatedWords } from "@/lib/api/search";
import ProductRelated from "../molecules/searchpage/ProductRelated";

export default async function ProductRelatedWrapper({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const relatedWords = await getRelatedWords(searchParams);

  return (
    <div className="w-[1280px] mx-auto">
      {relatedWords.data.length > 0 ? (
        <ProductRelated relatedWords={relatedWords.data}/>
      ) : (
        <div className="w-full h-2"></div>
      )}
    </div>
  )
}