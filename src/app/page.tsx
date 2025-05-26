import HomeTitle from "@/components/molecules/HomeTitle";
import SpinningWord from "@/components/atoms/SpinningWord";
import SearchInput from "@/components/templates/SearchInput";
import {Metadata} from "next";
import QueryProvider from "@/components/QueryProvider";

export const metadata: Metadata = {
  title: "중고 경매 플랫폼 팔구삼 893",
  description: "중고 상품을 경매로 사고 팔 수 있는 팔구삼 893",
}

export default async function Home() {
  return (
    <>
      <div className="grid justify-center items-center gap-6 w-full mt-6">
        <HomeTitle>
          <SpinningWord/>
          <span>&nbsp;경매에 참여해보세요</span>
        </HomeTitle>
        <div className="flex justify-center w-full">
          <QueryProvider>
            <SearchInput/>
          </QueryProvider>
        </div>
      </div>
    </>
  );
}