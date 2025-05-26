// src/app/detail/[idx]/page.tsx (Server Component)
import { cookies } from "next/headers";
import DetailPageClient from "./DetailPageClient";
import { getBidData, getProductData, getRelatedItem } from "@/lib/api/auction";

interface PageProps {
  params: { idx : string };
}

export default async function Page({ params }: PageProps) {
  const cookieStore = cookies();
	const auctionId = params?.idx;
  const isLoggedIn = cookieStore.has("accessToken");

	const [bidData, productData, relatedItem] = await Promise.all([
		getBidData(auctionId),
		getProductData(auctionId),
		getRelatedItem(auctionId)
	]);

  return <DetailPageClient isLoggedIn={isLoggedIn} initialBidData={bidData} initialProductData={productData} relatedItem={relatedItem} />;
}
