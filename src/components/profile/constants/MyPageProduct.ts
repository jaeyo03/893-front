
// 상태 라벨 및 클래스 정의용 인터페이스
export interface AuctionStatus {
  label: string;
  className: string;
}

// 상태 조건에 따른 반환 함수
export const getAuctionStatus = (isWinning: boolean): AuctionStatus => {
  return isWinning
    ? { label: "입찰 중", className: "bg-main" }
    : { label: "경매 중", className: "bg-warningkeword" };
};

export interface PurchaseStatus {
  label: string;
  className: string;
}
export const getPurchaseStatus = (isPurchased:boolean) : PurchaseStatus=>{
  return isPurchased
  ?{label:"구매완료",className:"bg-main"}
  :{label:"구매 전",className:"bg-warningkeword"}
}

// 입찰 카드에서 사용할 더미 데이터 (개발용)
export const bidInfo = {
  productName: "삼성 갤럭시 S23 Ultra",
  myBid: "₩750,000",
  currentBid: "₩750,000",
  remainingTime: "1일 23시간 59분",
  isWinning: false,
  status: "pending",
  isBookmarked: true,
};

export const bidEndInfo = {
  productName: "삼성 갤럭시 S23 Ultra",
  myBid: "₩750,000",
  currentBid: "₩750,000",
  orderNum:123123123123,
  ispurchased:false,
};
