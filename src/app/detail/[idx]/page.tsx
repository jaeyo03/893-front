// src/app/detail/[idx]/page.tsx (Server Component)
import { cookies } from "next/headers";
import DetailPageClient from "./DetailPageClient";
import { getBidData, getProductData, getRelatedItem } from "@/lib/api/auction";
import { notFound } from "next/navigation";
import QueryProvider from "@/components/QueryProvider";
import { AuctionBidData } from "@/types/productData";

interface PageProps {
  params: { idx : string };
}

export default async function Page({ params }: PageProps) {
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

	console.log(productData);
	console.log(relatedItemData);
	if (!productData) return notFound();

  return (
    <QueryProvider>
      <DetailPageClient isLoggedIn={isLoggedIn} initialBidData={initialBidData as AuctionBidData} product={productData} relatedItem={relatedItemData.data || null} />
    </QueryProvider>
  );
}
