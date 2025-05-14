// api/auction.ts 또는 컴포넌트 파일 상단에 작성
import axios from "axios";
import { AuctionBidData, Product } from "@/types/productData";

export async function fetchBidData(itemId: number): Promise<AuctionBidData | null> {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/auctions/${itemId}/bids`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error("입찰 내역 불러오기 실패:", error);
    return null;
  }
}

export async function fetchProductData(itemId: number): Promise<Product | null> {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/auctions/${itemId}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error("상품 정보 불러오기 실패:", error);
    return null;
  }
}


export const postBid = async ({
  auctionId,
  bidPrice,
}: {
  auctionId: number;
  bidPrice: number;
}) => {
  const response = await axios.post(
    `http://localhost:8080/api/auctions/${auctionId}/bids`,
    { bidPrice },
    { withCredentials: true }
  );
  return response.data;
};