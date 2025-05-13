import ImageSlider from "@/components/detail/ImageSlider";
import SellerProductInfo from "@/components/detail/SellerProductInfo";
import GoodsInfo from "@/components/detail/GoodsInfo"
import ProductCard from "@/components/detail/ProductCard";
import { getProductDescription,getRelatedProducts } from "@/types/productData";
import BidHistory from "@/components/detail/BidHistory";
import axios from "axios";
import { Bid } from "@/types/productData";


interface DetailPageProps{
    params: {
        idx : number;
    };
}


export default async function DetailPage({params} : DetailPageProps) {
  const itemId = params.idx
  const product = getProductDescription(itemId);
  const relatedProducts = getRelatedProducts(itemId);

  let bidData: Bid[] = [];
  let cancelData: Bid[] = [];
  
  try {//서버 api 호출, 경매 내역 데이터 불러오기
    const response = await axios.get(`http://localhost:8080/api/auctions/${itemId}/bids`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data.data;
  
    const transform = (bids: any[]) =>
      bids.map((bid: any, i: number) => ({
        rank: i + 1,   
        email: bid.bidderEmail,
        amount: bid.bidPrice,
        time: bid.createdAt,
      }));
  
    bidData = transform(data.bids);
    cancelData = transform(data.cancelledBids || []);
    } catch (error) {
      console.error("입찰 내역 불러오기 실패:", error);
    }


  return(
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <ImageSlider images={[
          '/images/adidas_shoe.jpg',
          '/images/converse.avif',
         '/images/nike_shoe.jpg',
        ]} />
        <GoodsInfo description={product} />
      </div>
        <div style={{ flex: 1, maxWidth: '620px' }}>
          <div className="mb-4">
            <SellerProductInfo relatedProducts={relatedProducts[0]} />
          </div>
          
          {/* BidHistory에 마진 추가 */}
          <div className="mb-4">
            <BidHistory bidData={bidData} cancelData={cancelData} />
          </div>
        </div>

    </div>
      <hr/>
        <div style={{padding: '20px'}}>
        <h2 className="pl-4 mb-2 text-xl font-bold">관련 상품</h2>
          <div className="flex gap-6 pl-4 overflow-x-auto scrollbar-hide">
              {relatedProducts.map((_item, index) => (
                <div className="min-w-[231px]" key={index}>
                  <ProductCard product={relatedProducts[0]}/>
                </div>
              ))}
        </div>
    </div>
    </>
    );
}