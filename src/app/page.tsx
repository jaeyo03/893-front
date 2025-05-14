import HomeTitle from "@/components/molecules/HomeTitle";
import SpinningWord from "@/components/atoms/SpinningWord";
import CategorySearchSection from "@/components/molecules/CategorySearchSection";
import SearchInput from "@/components/templates/SearchInput";
import { Metadata } from "next";
import QueryProvider from "@/components/QueryProvider";
import ProductCard from "@/components/detail/Product/ProductCard";
import {getSearchProducts} from "@/lib/api/search";

export const metadata: Metadata = {
  title: "중고 경매 플랫폼 팔구삼 893",
  description: "중고 상품을 경매로 사고 팔 수 있는 팔구삼 893",
}

export default async function Home() {
  const products = await getSearchProducts({});

  return (
    <>
      <div className="grid justify-center items-center gap-4 w-full">
        <HomeTitle>
          <SpinningWord/>
          <span>&nbsp;경매에 참여해보세요</span>
        </HomeTitle>
        <div className="flex justify-center w-full">
          <QueryProvider>
            <SearchInput/>
          </QueryProvider>
        </div>
        <CategorySearchSection/>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-8 mb-8">
        {products.data.auctionList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}
