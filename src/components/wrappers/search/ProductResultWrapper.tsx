import { getSearchProducts } from "@/lib/api/search";
import QueryProvider from "@/components/QueryProvider";
import AuctionCard from "@/components/AuctionCard";
import SearchPagination from "@/components/molecules/searchpage/SearchPagination";
import Image from "next/image";

export default async function ProductResultWrapper({ searchParams, isLoggedIn }: { searchParams: { [key: string]: string | string[] | undefined }, isLoggedIn: boolean }) {
  const products = await getSearchProducts(searchParams);
  const currentPage = searchParams.page ? parseInt(searchParams.page as string) : 1;

  return (
    <>
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
    </>
  )
}