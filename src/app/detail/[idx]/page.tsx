// src/app/detail/[idx]/page.tsx (Server Component)
import { getProductData } from "@/lib/api/auction";
import { notFound } from "next/navigation";
import GoodsInfo from "@/components/detail/Product/GoodsInfo";
import ImageSlider from "@/components/detail/ImageSlider";
import ProductHeader from "@/components/detail/ProductHeader";
import RelatedProductsWrapper from "@/components/wrappers/detail/RelatedProductsWrapper";
import DetailInfoWithBidWrapper from "@/components/wrappers/detail/DetailInfoWithBidWrapper";

interface PageProps {
  params: { idx : string };
}

export default async function DetailPage({ params }: PageProps) {
  const auctionId = parseInt(params?.idx);

	if (isNaN(auctionId)) {
		return notFound();
	}

	const productData = await getProductData(auctionId);
	
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
					<DetailInfoWithBidWrapper auctionId={auctionId} />
				</div>
			</div>
			<hr />
			<RelatedProductsWrapper params={params}/>
		</>
  );
}
