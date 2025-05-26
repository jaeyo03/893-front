import HomeTitle from "@/components/molecules/HomeTitle";
import SpinningWord from "@/components/atoms/SpinningWord";
import SearchInput from "@/components/templates/SearchBox";
import {Metadata} from "next";
import QueryProvider from "@/components/QueryProvider";
import AuctionCard from "@/components/detail/Product/AuctionCard";
import {getSearchProducts} from "@/lib/api/search";
import {cookies} from "next/headers";

export const metadata: Metadata = {
  title: "중고 경매 플랫폼 팔구삼 893",
  description: "중고 상품을 경매로 사고 팔 수 있는 팔구삼 893",
}

export default async function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const cookieHeader = accessToken ? `accessToken=${accessToken}` : '';
  
  const products = await getSearchProducts({}, cookieHeader);
  
  return (
    <>
      <div className="grid justify-center items-center gap-6 w-full mt-6">
        <HomeTitle>
          <SpinningWord/>
          <span>&nbsp;경매에 참여해보세요</span>
        </HomeTitle>
        <div className="flex justify-center w-full">
          <QueryProvider>
            <SearchInput isLogin={accessToken ? true : false}/>
          </QueryProvider>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-8 mb-8">
        {products.data.auctionList.map((product) => (
          <AuctionCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}