import ImageSlider from "@/components/detail/ImageSlider";
import ProductInfo from "@/components/detail/ProductInfo";

interface DetailPageProps{
    params: {
        idx : string;
    };
}

export default function DetailPage({params} : DetailPageProps) {
  const itemId = params.idx
  return(
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <ImageSlider />
      </div>
    
      <div style={{ flex: 1, maxWidth: '620px' }}>
        <ProductInfo />
      </div>
    </div>
    );
}


//상품 이미지 컴포넌트 -> 이미지, 경매 상태, 북마크(찜)
//이미지 슬라이딩 표시 컴포넌트
//상세 설명 -> 카테고리, 상품 상태, 설명
//경매 정보(경매 제목(string),판매자 이메일(string), 현재가, 남은 시간, 입찰 횟수, 찜(관심도)수, 입찰자 수,입찰 금액 입력, 입찰하기(결제하기-> 경매 종료시, 낙찰자인 경우))
//진행 중 -> 입찰 한 경우 -> 취소 버튼 생성
//입찰 내역
//입찰 취소 내역
//연관 상품