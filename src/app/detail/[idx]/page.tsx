import ImageSlider from "@/components/detail/ImageSlider";
import ProductInfo from "@/components/detail/ProductInfo";
import BidHistory from "@/components/detail/BidHistory";
import GoodsInfo from "@/components/detail/GoodsInfo"
import ProductCard from "@/components/detail/ProductCard";

interface DetailPageProps{
    params: {
        idx : string;
    };
}


export default function DetailPage({params} : DetailPageProps) {
  const itemId = params.idx
  {/*api 호출 필요*/}
  const product = "해당 상품은 아디다스 신발입니다.\n 사주세요.";
  const relatedProducts = [
    {
      imageUrl: "/images/adidas_shoe.jpg",
      title: "아디다스 삼바 블랙 팝니다",
      status: "yet",
      startTime: "2025-04-20",
      endTime: "2025-04-26",
      currentPrice: 89000,
      bidderCount: 13,
      scrapCount: 10,
      itemId : itemId
    },
    // 다른 상품도 추가 가능
  ];
  return(
    <><div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          <ImageSlider />
          <GoodsInfo description={product} />
        </div>

        <div style={{ flex: 1, maxWidth: '620px' }}>
          <ProductInfo
            currentPrice= {30000}
            bidCount={4}
            bidderCount={2}
            endTime="2025/05/09 14:30:00" />
          <BidHistory />
        </div>

    </div>
    <hr />
    <div style={{padding: '20px'}}>
    <h2 className="pl-4 mb-2 text-xl font-bold">관련 상품</h2>
      <div className="flex gap-6 pl-4 overflow-x-auto scrollbar-hide">
          {relatedProducts.map((item, index) => (
            <div className="min-w-[231px]" key={index}>
              <ProductCard {...item} />
            </div>
          ))}
      </div>
      </div>
    </>
    
    );
}