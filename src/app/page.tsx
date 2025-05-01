import CategorySection from "@/components/molecules/CategorySection";
import HomeTitle from "@/components/molecules/HomeTitle";
import SpinningWord from "@/components/atoms/SpinningWord";
import SearchInput from "@/components/atoms/SearchInput";

export default function Home() {
  return (
    <div className="grid justify-center items-center gap-4 w-full">
      <HomeTitle>
        <SpinningWord/>
        <span>&nbsp;경매에 참여해보세요</span>
      </HomeTitle>
      <div className="flex justify-center w-full">
        <SearchInput/>
      </div>
      <CategorySection/>
    </div>
  );
}
