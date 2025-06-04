import SearchInput from "@/components/templates/SearchBox";
import CategoryFilter from "@/components/templates/searchpage/CategoryFilter";
import PriceFilter from "@/components/molecules/searchpage/PriceFilter";
import AuctionStatusFilter from "@/components/templates/searchpage/AuctionStatusFilter";
import ProductStatusFilter from "@/components/templates/searchpage/ProductStatusFilter";
import ProductSort from "@/components/molecules/searchpage/ProductSort";
import ProductRelated from "@/components/molecules/searchpage/ProductRelated";
import FilterRefreshButton from "@/components/atoms/searchpage/FilterRefreshButton";
import AuctionCard from "@/components/AuctionCard";
import {getRelatedWords, getSearchProducts, getCategoryList} from "@/lib/api/search";
import QueryProvider from "@/components/QueryProvider";
import {cookies} from "next/headers";
import Image from "next/image";
import SearchPagination from "@/components/molecules/searchpage/SearchPagination";

export default async function SearchPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const cookieStore = cookies();
	const accessToken = cookieStore.get('accessToken')?.value;
	const isLoggedIn = accessToken ? true : false;

	const productsData = getSearchProducts(searchParams);
	const relatedWordsData = getRelatedWords(searchParams);
	const categoryListData = getCategoryList();
	const currentPage = searchParams.page ? parseInt(searchParams.page as string) : 1;

	const [products, relatedWords, categoryList] = await Promise.all([
			productsData,
			relatedWordsData,
			categoryListData,
	]);

	const { min: lowestPrice, max: highestPrice } = products?.data?.auctionList.reduce(
		(accumulator, product) => ({
			min: Math.min(accumulator.min, product.basePrice),
			max: Math.max(accumulator.max, product.basePrice),
		}),
		{
			min: products?.data?.auctionList[0]?.basePrice,
			max: products?.data?.auctionList[0]?.basePrice,
		}
	);
	
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
				{relatedWords.data.length > 0 ? (
					<ProductRelated relatedWords={relatedWords.data}/>
				) : (
					<div className="w-full h-2"></div>
				)}
				<div className="bg-graybg h-auto p-4 flex gap-4">
					<div className="bg-white rounded-[12px] py-2 w-1/5 sticky top-16">
						<div className="flex justify-between items-center px-4 py-2">
							<div className="font-bold text-xl">검색 필터</div>
							<FilterRefreshButton/>
						</div>
						<div className="border-b-[1.5px] border-divider my-2"></div>
						<CategoryFilter categoryList={categoryList?.data}/>
						<div className="border-b-[1.5px] border-divider my-2"></div>
						<PriceFilter
							minPrice={lowestPrice}
							maxPrice={highestPrice}
						/>
						<div className="border-b-[1.5px] border-divider my-2"></div>
						<AuctionStatusFilter/>
						<div className="border-b-[1.5px] border-divider my-2"></div>
						<ProductStatusFilter/>
					</div>
					<div className="w-4/5">
						<ProductSort/>
						{products?.data?.auctionList?.length > 0 ? (
							<>
								<QueryProvider>
									<div className="grid grid-cols-4 grid-rows-3 gap-4 mt-4 h-[1022px]">
										{products.data.auctionList.map((product) => (
											<AuctionCard key={product.id} product={product} isLoggedIn={isLoggedIn}/>
										))}
									</div>
								</QueryProvider>
								<SearchPagination
									totalPages={Math.ceil(products.data.totalAuctionsCount / 12)}
									currentPage={currentPage}
								/>
							</>
						) : (
							<div className="flex flex-col items-center h-96 gap-2 justify-center">
								<Image src="/icons/SearchEmpty.svg" alt="검색 결과가 없습니다." width={121} height={99}/>
								<div className="text-center text-gray-500">검색 결과가 없습니다.</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
