'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProductHeaderProps {
  title: string;
  mainCategory: string;
  subCategory: string;
  lastCategory: string;
  auctionId: number;
}

export default function SellerProductHeader({
  title,
  mainCategory,
  subCategory,
  lastCategory,
  auctionId,
}: ProductHeaderProps) {
  const router = useRouter();
  const handleClick =() =>{
    router.push(`/edit/${auctionId}`)
  }
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{title}</h1>
        <Button variant="default" className="w-[72px] h-[32px] bg-main hover:bg-main text-white text-sm" onClick={handleClick}>
          수정하기

        </Button>
      </div>
      <p className="text-xs font-thin">
        {mainCategory} &gt; {subCategory} &gt; {lastCategory}
      </p>
    </div>
  );
}
