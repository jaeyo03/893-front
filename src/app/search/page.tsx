import SearchInput from "@/components/templates/SearchBox";
import PriceFilter from "@/components/molecules/searchpage/PriceFilter";
import AuctionStatusFilter from "@/components/templates/searchpage/AuctionStatusFilter";
import ProductStatusFilter from "@/components/templates/searchpage/ProductStatusFilter";
import ProductSort from "@/components/molecules/searchpage/ProductSort";
import FilterRefreshButton from "@/components/atoms/searchpage/FilterRefreshButton";
import QueryProvider from "@/components/QueryProvider";
import {cookies} from "next/headers";
import ProductRelatedWrapper from "@/components/wrappers/search/ProductRelatedWrapper";
import { Suspense } from "react";
import CategoryFilterWrapper from "@/components/wrappers/search/CategoryFilterWrapper";
import ProductResultWrapper from "@/components/wrappers/search/ProductResultWrapper";
import SearchLoading from "@/components/SearchLoading";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ index?: string }> }) {
	const cookieStore = cookies();
	const accessToken = cookieStore.get('accessToken')?.value;
	const isLoggedIn = accessToken ? true : false;
	
	const search = await searchParams;
  const key = new URLSearchParams(search).toString();
	
	return (
		<>
			<div className="grid mt-4 gap-4">
				<div className="flex justify-center gap-10 items-center">
					<div className="font-bold text-xl">
						경매에 참여하고 싶은 물건을 검색해보세요
					</div>
					<QueryProvider>
						<SearchInput isLoggedIn={isLoggedIn}/>
					</QueryProvider>
				</div>
				<ProductRelatedWrapper searchParams={search}/>
				<div className="bg-graybg">
					<div className="w-[1280px] mx-auto h-auto p-4 flex gap-4">
						<div className="bg-white rounded-[12px] py-2 w-1/5 sticky top-16">
							<div className="flex justify-between items-center px-4 py-2">
								<div className="font-bold text-xl">검색 필터</div>
								<FilterRefreshButton/>
							</div>
							<div className="border-b-[1.5px] border-divider my-2"></div>
							<CategoryFilterWrapper/>
							<div className="border-b-[1.5px] border-divider my-2"></div>
							{/* 아래 가격은 어떻게 하지 ㅠㅠ */}
							<PriceFilter
								minPrice={5000}
								maxPrice={1000000}
							/>
							<div className="border-b-[1.5px] border-divider my-2"></div>
							<AuctionStatusFilter/>
							<div className="border-b-[1.5px] border-divider my-2"></div>
							<ProductStatusFilter/>
						</div>
						<div className="w-4/5">
							<ProductSort/>
							<Suspense key={key} fallback={<div className="w-[985px] h-[1209px] flex justify-center items-center"><SearchLoading/></div>}>
								<ProductResultWrapper searchParams={search} isLoggedIn={isLoggedIn}/>
							</Suspense>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
