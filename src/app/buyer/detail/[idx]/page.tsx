import ImageSlider from "@/components/detail/ImageSlider";
import ProductInfo from "@/components/detail/ProductInfo";
import GoodsInfo from "@/components/detail/GoodsInfo"
import ProductCard from "@/components/detail/ProductCard";
import { getProductDescription,getRelatedProducts,getBids,getCanceledBids } from "@/data/productData";
import BidHistory from "@/components/detail/BidHistory";


interface DetailPageProps{
    params: {
        idx : number;
    };
}


export default function DetailPage({params} : DetailPageProps) {
  const itemId = params.idx
  const product = getProductDescription(itemId);
  const relatedProducts = getRelatedProducts(itemId);
  const bids = getBids();
  const canceledBids = getCanceledBids();


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
            <ProductInfo relatedProducts={relatedProducts[0]}/>
          </div>
          
          {/* BidHistory에 마진 추가 */}
          <div className="mb-4">
            <BidHistory bidData={bids} cancelData={canceledBids} />
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