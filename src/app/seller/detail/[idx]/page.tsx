import SellerDetailView from "@/components/detail/Product/Sell/SellerDetailView";

interface DetailPageProps {
  params: { idx: number };
}

export default function SellerDetailPage({ params }: DetailPageProps) {
  return <SellerDetailView itemId={params.idx} />;
}
