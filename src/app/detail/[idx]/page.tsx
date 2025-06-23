// src/app/detail/[idx]/page.tsx (Server Component)
import { cookies } from "next/headers";
import DetailInfoWithBid from "../../../components/detail/DetailInfoWithBid";
import { getBidData, getProductData, getRelatedItem } from "@/lib/api/auction";
import { notFound } from "next/navigation";
import { AuctionBidData } from "@/types/productData";
import GoodsInfo from "@/components/detail/Product/GoodsInfo";
import ImageSlider from "@/components/detail/ImageSlider";
import ProductHeader from "@/components/detail/ProductHeader";
import RelatedProductsWrapper from "@/components/wrappers/detail/RelatedProductsWrapper";

interface PageProps {
  params: { idx : string };
}

export default async function DetailPage({ params }: PageProps) {
  const auctionId = parseInt(params?.idx);
	
	const cookieStore = cookies();
  const isLoggedIn = cookieStore.has("accessToken");

	if (isNaN(auctionId)) {
		return notFound();
	}

	const [initialBidData, productData] = await Promise.all([
		getBidData(auctionId),
		getProductData(auctionId),
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
			<RelatedProductsWrapper params={params}/>
		</>
  );
}
