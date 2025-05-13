import SearchInput from "@/components/templates/SearchInput";
import CategoryFilter from "@/components/templates/searchpage/CategoryFilter";
import PriceFilter from "@/components/molecules/searchpage/PriceFilter";
import AuctionStatusFilter from "@/components/templates/searchpage/AuctionStatusFilter";
import ProductStatusFilter from "@/components/templates/searchpage/ProductStatusFilter";
import ProductSort from "@/components/molecules/searchpage/ProductSort";
import ProductRelated from "@/components/molecules/searchpage/ProductRelated";
import FilterRefreshButton from "@/components/atoms/searchpage/FilterRefreshButton";
import ProductCard from "@/components/detail/ProductCard";

async function getSearchProducts(searchParams: Record<string, string | string[] | undefined>) {
  const urlSearchParams = new URLSearchParams();
  
  // searchParams을 순회하며 URLSearchParams에 추가
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // 배열인 경우 각 항목을 같은 키로 추가
      value.forEach(item => {
        if (item) urlSearchParams.append(key, item);
      });
    } else if (value !== undefined) {
      // 단일 값인 경우 추가
      urlSearchParams.append(key, value);
    }
  });
  
  let queryString = urlSearchParams.toString();

  if (queryString.length > 0) {
    queryString = `?${queryString}`;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auctions/search?${queryString}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export default async function SearchPage({ searchParams } : { searchParams : { [key: string]: string | string[] | undefined } }) {
  const products = await getSearchProducts(searchParams);
  console.log(products);
  return (
    <div className="grid mt-4 gap-4">
      <div className="flex justify-center gap-10 items-center">
        <div className="font-bold text-xl">경매에 참여하고 싶은 물건을 검색해보세요</div>
        <SearchInput/>
      </div>
      <ProductRelated relatedWords={["카메라", "아이폰", "에어팟"]}/>
      <div className="bg-graybg h-auto p-4 flex gap-4">
        <div className="bg-white rounded-[12px] py-2 w-1/5">
          <div className="flex justify-between items-center px-4 py-2">
            <div className="font-bold text-xl">
              검색 필터
            </div>
            <FilterRefreshButton/>
          </div>
          <CategoryFilter/>
          <PriceFilter/>
          <AuctionStatusFilter/>
          <ProductStatusFilter/>
        </div>
        <div className="w-4/5">
          <ProductSort/>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                imageUrl={product.imageUrl}
                title={product.title}
                status={product.status}
                startTime={product.startTime}
                endTime={product.endTime}
                currentPrice={product.currentPrice}
                bidderCount={product.bidderCount}
                scrapCount={product.scrapCount}
                isScrapped={product.isScrapped}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}