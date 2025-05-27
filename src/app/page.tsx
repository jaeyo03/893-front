import HomeTitle from "@/components/molecules/HomeTitle";
import SpinningWord from "@/components/atoms/SpinningWord";
import SearchInput from "@/components/templates/SearchBox";
import { Metadata } from "next";
import QueryProvider from "@/components/QueryProvider";
import { cookies } from "next/headers";
import RecentAuctionList from "@/components/home/RecentAuctionList";
export const metadata: Metadata = {
  title: "중고 경매 플랫폼 팔구삼 893",
  description: "중고 상품을 경매로 사고 팔 수 있는 팔구삼 893",
};

export default async function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return (
    <>
      <div className="grid w-full gap-6 mt-6">
        <HomeTitle>
          <SpinningWord />
          <span>&nbsp;경매에 참여해보세요</span>
        </HomeTitle>
        <div className="flex justify-center w-full">
          <QueryProvider>
            <SearchInput isLogin={accessToken ? true : false} />
          </QueryProvider>
        </div>
        <div className="flex justify-start w-[800px] h-[400px]">
          <RecentAuctionList />
        </div>
      </div>
    </>
  );
}
