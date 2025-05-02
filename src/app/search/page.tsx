import SearchInput from "@/components/molecules/SearchInput";
import RelatedWordButton from "@/components/atoms/RelatedWordButton";
import { RefreshCcw } from "lucide-react";
export default function SearchPage() {
  return (
    <div className="grid mt-4 gap-4">
      <div className="flex justify-center gap-10 items-center">
        <div className="font-bold text-xl">경매에 참여하고 싶은 물건을 검색해보세요</div>
        <SearchInput/>
      </div>
      <div className="flex gap-2 items-center">
        <div className="font-bold">
          연관
        </div>
        <RelatedWordButton/>
      </div>
      <div className="bg-graybg h-[200px] p-4 flex gap-4">
        <div className="bg-white rounded-[12px] py-2 w-1/5"> 
          <div className="border-b-[1px] border-divider">
            <div className="flex justify-between items-center px-4 py-2">
              <div className="font-bold text-md">
                검색 필터
              </div>
              <button>
                <RefreshCcw size={20}/>
              </button>
            </div>
            <div className="px-4 py-2">
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-4/5">
          <div className="bg-white rounded-[12px] py-2"> 
            <div className="font-semibold text-md border-b-[1px] border-divider px-4 py-2 h-10 flex items-center">
              정렬 기준 선택
            </div>
            <div className="px-4 py-2 flex items-center gap-4 text-neutral-500 h-10">
              <button>
                최신순
              </button>
              <div className="w-1 h-1 bg-neutral-400/60" />
              <button>
                낮은 시작 가격순
              </button>
              <div className="w-1 h-1 bg-neutral-400/60" />
              <button>
                높은 시작 가격순
              </button>
              <div className="w-1 h-1 bg-neutral-400/60" />
              <button>
                입찰자순
              </button>
              <div className="w-1 h-1 bg-neutral-400/60" />
              <button>
                찜순
              </button>
            </div>
          </div>
          <div>
            하하
          </div>
        </div>
      </div>
    </div>
  )
}