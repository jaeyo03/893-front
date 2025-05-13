import BuyerDetailView from "@/components/detail/Product/BUY/BuyerDetailView";
interface DetailPageProps {
  params: { idx: number };
}

export default function BuyerDetailPage({ params }: DetailPageProps) {
  return <BuyerDetailView itemId={params.idx} />;
}
