// api/auction.ts 또는 컴포넌트 파일 상단에 작성
import axios from "axios";
import { AuctionBidData, Product,RelatedItem } from "@/types/productData";

const API_URL = "http://localhost:8080/api/auctions";

export async function getBidData(itemId: number): Promise<AuctionBidData | null> {
  try {
    const response = await axios.get(
      `${API_URL}/${itemId}/bids`,
      { withCredentials: true }
    );
    return response.data?.data;
  } catch (error) {
    console.error("입찰 내역 불러오기 실패:", error);
    return null;
  }
}

export const getProductData = async (itemId: number): Promise<Product | null> => {
  try {
    const response = await axios.get(`${API_URL}/${itemId}`,
      {withCredentials: true }
    );
    return response.data?.data;
  } catch (error) {
    console.error('❌ 상품 데이터를 불러오는 중 오류 발생:', error);
    return null;
  }
};

export const postBid = async ({
  itemId,
  bidPrice,
}: {
  itemId: number;
  bidPrice: number;
}) => {
  try {
    const response = await axios.post(`${API_URL}/${itemId}/bids`,{
      price: bidPrice,
    },{withCredentials:true,});

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
    throw new Error('입찰 요청 실패');
  }
};

export const cancelBid = async ({
  auctionId,
  bidId,
}: {
  auctionId: number;
  bidId: number;
}) => {
  try {
    const response = await axios.patch(
      `${API_URL}/${auctionId}/bids/${bidId}`,
      {},
      { withCredentials: true, }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
    throw new Error('입찰 취소 실패');
  }
};


export const getRelatedItem = async (auctionId:number) => {
  try {
    const response = await axios.get(`${API_URL}/${auctionId}/related`,{
      withCredentials:true
    });
    return response.data?.data; // 필요한 데이터 리턴
  } catch (error) {
    console.error('Failed to fetch related item:', error);
    throw error;
  }
};

export const addScrap = async (id:number) => {
  try {
    const response = await axios.post(`${API_URL}/${id}/scrap`,
      {},
      {withCredentials:true}
    );
    return response.data;
  } catch (error) {
    console.error("스크랩 성공 실패: ", error);
    throw error;
  }
};

export const removeScrap = async (id:number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}/scrap`,
      {withCredentials:true}
    );
    return response.data;
  } catch (error) {
    console.error("스크랩 취소 실패: ", error);
    throw error;
  }
};