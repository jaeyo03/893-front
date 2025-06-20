import Image from "next/image";

interface AuctionImageCardProps {
  imageUrl: string;
}

export default function AuctionImageCard({
  imageUrl,
}: AuctionImageCardProps) {
  return (
    <div className="p-5">
      <div className="relative border rounded-lg overflow-hidden w-[600px] h-[600px] bg-white">
        <Image
          src={imageUrl || "/placeholder.jpg"}
          alt="Auction item"
          width={600}
          height={600}
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
