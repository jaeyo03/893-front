import HomeTitle from "@/components/molecules/HomeTitle";
import SpinningWord from "@/components/atoms/SpinningWord";
import CategorySearchSection from "@/components/molecules/CategorySearchSection";
import SearchInput from "@/components/molecules/SearchInput";
// async function getProducts() {
//   const res = await fetch('http://localhost:3000/mocks/products.json'); // TODO 추후 백엔드 URI로 변경

//   if (!res.ok) {
//     throw new Error('Failed to fetch products');
//   }

//   return res;
// }

export default async function Home() {
  // const products = await getProducts(); // TODO 추후 상품 섹션과 연결

  return (
    <div className="grid justify-center items-center gap-4 w-full">
      <HomeTitle>
        <SpinningWord/>
        <span>&nbsp;경매에 참여해보세요</span>
      </HomeTitle>
      <div className="flex justify-center w-full">
        <SearchInput/>
      </div>
      <CategorySearchSection/>
    </div>
  );
}
