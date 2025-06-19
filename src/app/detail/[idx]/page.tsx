// src/app/detail/[idx]/page.tsx (Server Component)
import { cookies } from "next/headers";
import DetailInfoWithBid from "../../../components/detail/DetailInfoWithBid";
import { getBidData, getProductData, getRelatedItem } from "@/lib/api/auction";
import { notFound } from "next/navigation";
import QueryProvider from "@/components/QueryProvider";
import { AuctionBidData } from "@/types/productData";
import RelatedProducts from "@/components/detail/RelatedProducts";
import GoodsInfo from "@/components/detail/Product/GoodsInfo";
import ImageSlider from "@/components/detail/ImageSlider";
import ProductHeader from "@/components/detail/ProductHeader";

interface PageProps {
  params: { idx : string };
}

export default async function DetailPage({ params }: PageProps) {
  const cookieStore = cookies();
	const auctionId = parseInt(params?.idx);
	const accessToken = cookieStore.get('accessToken')?.value;
	const cookieHeader = accessToken ? `accessToken=${accessToken}` : '';
  const isLoggedIn = cookieStore.has("accessToken");

	if (isNaN(auctionId)) {
		return notFound();
	}

	const [initialBidData, productData, relatedItemData] = await Promise.all([
		getBidData(auctionId, cookieHeader),
		getProductData(auctionId, cookieHeader),
		getRelatedItem(auctionId, cookieHeader)
	]);

	if (!productData) return notFound();

  return (
		<>
			<div className="flex justify-between p-2 w-[1280px] mx-auto mb-4">
				<div className="flex-1 mr-6 flex flex-col gap-6">
					<ImageSlider
						images={productData.images}
					/>
					<GoodsInfo
						description={productData.description}
						itemCondition={productData.itemCondition}
					/>
				</div>
				<div className="flex-1 ml-6 max-w-[620px] mt-5">
					<ProductHeader product={productData}/>
					<DetailInfoWithBid isLoggedIn={isLoggedIn} initialBidData={initialBidData as AuctionBidData} product={productData} />
				</div>
			</div>
			<hr />
			<QueryProvider>
				<RelatedProducts relatedItem={relatedItemData.data || null} isLoggedIn={isLoggedIn} />
			</QueryProvider>
		</>
  );
}
