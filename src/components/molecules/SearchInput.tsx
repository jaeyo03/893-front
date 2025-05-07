"use client"

import {useState, useRef, useEffect} from "react";
import {ChevronDown, ChevronUp, Search, X} from "lucide-react";
import searchData from "@/data/searchData.json";
import RecentSearchWordButton from "@/components/atoms/RecentSearchWordButton";
import RecommendSearchWord from "../atoms/RecommendSearchWordButton";
import RelatedSearchWordButton from "../atoms/RelatedSearchWordButton";
import { useRouter } from "next/navigation";

type SearchStatus = 'CLOSED' | 'RECENT_RECOMMENDED' | 'RELATED';

export default function SearchInput() {
  const router = useRouter();
  const [searchStatus, setSearchStatus] = useState<SearchStatus>('CLOSED');
  const formRef = useRef<HTMLFormElement>(null);
  const [recentSearches, setRecentSearches] = useState(searchData.recentSearches); // TODO 추후 백엔드 연동
  const [recommendedSearches] = useState(searchData.recommendedSearches); // TODO 추후 백엔드 연동
  const [relatedWords] = useState(searchData.relatedWords); // TODO 추후 백엔드 연동
  const [inputValue, setInputValue] = useState("");
  
  const handleInputClick = () => {
    if (searchStatus === 'CLOSED') {
      setSearchStatus(inputValue.length > 0 ? 'RELATED' : 'RECENT_RECOMMENDED');
    } else {
      setSearchStatus('CLOSED');
    }
  };

  const handleCloseSearchContent = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setSearchStatus('CLOSED');
  }

  const handleChevronClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (searchStatus === 'CLOSED') {
      setSearchStatus(inputValue.length > 0 ? 'RELATED' : 'RECENT_RECOMMENDED');
    } else {
      setSearchStatus('CLOSED');
    }
  }

  const handleDeleteSearch = (event: React.MouseEvent, searchKeywordId: number) => {
    event.preventDefault();
    event.stopPropagation();
    setRecentSearches(prev => prev.filter((_, i) => i !== searchKeywordId));
  }

  const handleDeleteAllSearches = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setInputValue("");
    setSearchStatus('RECENT_RECOMMENDED');
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    
    if (searchStatus !== 'CLOSED') {
      setSearchStatus(value.length > 0 ? 'RELATED' : 'RECENT_RECOMMENDED');
    }

    if (searchStatus === 'CLOSED') {
      setSearchStatus(value.length > 0 ? 'RELATED' : 'RECENT_RECOMMENDED');
    }
  }

  const handleAddSearch = (event: React.MouseEvent, searchKeyword: string) => {
    event.preventDefault();
    event.stopPropagation();
    setInputValue(searchKeyword);
    setSearchStatus('RELATED'); // 검색어 추가 시 관련 검색어 표시
  }

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      router.replace(`/search?keyword=${encodeURIComponent(inputValue.trim())}`);
      setSearchStatus('CLOSED');
      
      const newSearch = {
        text: inputValue.trim(),
        date: new Date().toLocaleDateString()
      };
      setRecentSearches(prev => [newSearch, ...prev.slice(0, 4)]); // 최대 5개 유지
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setSearchStatus('CLOSED');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isSearchContentOpen = searchStatus !== 'CLOSED';
  const isRelatedSearchContentOpen = searchStatus === 'RELATED';

  return (
    <form 
      ref={formRef}
      name="search" 
      method="get"
      onSubmit={handleSearch}
      className={`border-main border-[1.5px] w-[692px] h-[59px] relative rounded-[12px] ${isSearchContentOpen ? 'rounded-b-none' : ''}`}
    >
      <div className="flex items-center w-full justify-between p-4">
        <input
          type="text"
          onClick={handleInputClick}
          onChange={handleInputChange}
          value={inputValue}
          placeholder="경매 제목 입력"
          className="w-full"
        />
        <div className="flex items-center gap-2">
          {isRelatedSearchContentOpen && (
            <button type="button" onClick={handleDeleteAllSearches} className="rounded-full bg-[#EFF2F4] flex items-center justify-center">
              <X size={16} color="#898989"/>
            </button>
          )}
          <button type="button" onClick={handleChevronClick}>
            {isSearchContentOpen ? (
              <ChevronUp size={22} />
            ) : (
              <ChevronDown size={22} />
            )}
          </button>
          <div className="h-3 border-gray-300 border-[0.5px]"/>
          <button type="submit">
            <Search size={22} />
          </button>
        </div>
      </div>
      {isSearchContentOpen && (
        <div className="absolute rounded-b-[12px] w-full -ml-[1.5px] bg-white grid gap-4 border-l-[1.5px] border-r-[1.5px] border-b-[1.5px] border-main" style={{ width: 'calc(100% + 3px)' }}>
          {isRelatedSearchContentOpen ? (
            <>
              <div className="border-t border-t-[#E5E9EC]">
                {relatedWords.map((word, index) => (
                  <RelatedSearchWordButton 
                    key={index} 
                    searchKeyword={word} 
                    handleAddSearch={handleAddSearch}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="border-t border-t-[#E5E9EC]">
                <div className="pr-4 pl-4 pt-4 pb-2 text-[#373737] flex text-sm items-center justify-between">
                  <div>최근 검색어</div>
                  <button type="button" onClick={handleDeleteAllSearches} className="text-[#898989]">전체 삭제</button>
                </div>
                {recentSearches.length > 0 ? (
                  recentSearches.map((search, index) => (
                    <RecentSearchWordButton 
                      key={index} 
                      searchKeywordId={index} 
                      searchKeyword={search.text} 
                      createdAt={search.date} 
                      handleDeleteSearch={handleDeleteSearch}
                    />
                  ))
                ) : (
                  <div className="p-4 text-center text-[#898989]">최근 검색어가 없습니다</div>
                )}
              </div>
              <div className="grid gap-2">
                <div className="pl-4 pr-4 text-[#373737] flex text-sm items-center justify-between">
                  추천 검색어
                </div>
                <div className="pl-4 pr-4 pt-1 pb-2 flex gap-2 flex-wrap">
                  {recommendedSearches.map((search, index) => (
                    <RecommendSearchWord searchWord={search} key={index}/>
                  ))}
                </div>
              </div>
              <div className="pl-4 pr-4 pt-2 pb-2 border-t-[1px] border-[#EFF2F4] flex justify-end">
                <button type="button" onClick={handleCloseSearchContent} className="text-[#898989]">
                  닫기
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </form>
  )
}