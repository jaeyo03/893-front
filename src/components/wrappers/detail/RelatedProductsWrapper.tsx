import RelatedProducts from "@/components/detail/RelatedProducts";
import QueryProvider from "@/components/QueryProvider";
import { getRelatedItem } from "@/lib/api/auction";
import { cookies } from "next/headers";

interface PageProps {
  params: { idx : string };
}

export default async function RelatedProductsWrapper({ params }: PageProps) {
  const auctionId = parseInt(params?.idx);
  const relatedItemData = await getRelatedItem(auctionId);
  const cookieStore = cookies();
  const isLoggedIn = cookieStore.has("accessToken");

  if (!relatedItemData.data) return null;
  
  return (
    <QueryProvider>
      <RelatedProducts relatedItem={relatedItemData.data} isLoggedIn={isLoggedIn} />
    </QueryProvider>
  )
}