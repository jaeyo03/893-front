import SearchInput from "@/components/molecules/SearchInput";
import CategoryFilter from "@/components/templates/searchpage/CategoryFilter";
import PriceFilter from "@/components/molecules/searchpage/PriceFilter";
import AuctionStatusFilter from "@/components/templates/searchpage/AuctionStatusFilter";
import ProductStatusFilter from "@/components/templates/searchpage/ProductStatusFilter";
import ProductSort from "@/components/molecules/searchpage/ProductSort";
import ProductRelated from "@/components/molecules/searchpage/ProductRelated";
import FilterRefreshButton from "@/components/atoms/searchpage/FilterRefreshButton";

export default function SearchPage() {
  return (
    <div className="grid mt-4 gap-4">
      <div className="flex justify-center gap-10 items-center">
        <div className="font-bold text-xl">경매에 참여하고 싶은 물건을 검색해보세요</div>
        <SearchInput/>
      </div>
      <ProductRelated/>
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
          <div>
            하하
          </div>
        </div>
      </div>
    </div>
  )
}