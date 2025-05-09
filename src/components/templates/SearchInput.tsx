"use client"

import {useState, useRef, useEffect} from "react";
import {ChevronDown, ChevronUp, Search, X} from "lucide-react";
import searchData from "@/data/searchData.json";
import { useRouter, useSearchParams } from "next/navigation";
import RecentSearchContent from "../molecules/searchinput/RecentSearchContent";
import RelatedSearchContent from "../molecules/searchinput/RelatedSearchContent";

type SearchStatus = 'CLOSED' | 'RECENT_RECOMMENDED' | 'RELATED';

export default function SearchInput() {
  const router = useRouter();
  const [searchStatus, setSearchStatus] = useState<SearchStatus>('CLOSED');
  const formRef = useRef<HTMLFormElement>(null);
  const [recentSearches, setRecentSearches] = useState(searchData.recentSearches); // TODO 추후 백엔드 연동
  const [recommendedSearches] = useState(searchData.recommendedSearches); // TODO 추후 백엔드 연동
  const [relatedWords] = useState(searchData.relatedWords); // TODO 추후 백엔드 연동
  const searchParams = useSearchParams()
  const currentKeyword = searchParams.get('keyword')
  const [inputValue, setInputValue] = useState(currentKeyword || "");
  
  const handleInputClick = () => {
    if (searchStatus === 'CLOSED') {
      setSearchStatus(inputValue.length > 0 ? 'RELATED' : 'RECENT_RECOMMENDED');
    } else {
      setSearchStatus('CLOSED');
    }
  };

  const handleCloseSearchContent = () => {
    setSearchStatus('CLOSED');
  }

  const handleDeleteSearch = (searchKeywordId: number) => {
    setRecentSearches(prev => prev.filter((_, i) => i !== searchKeywordId));
  }

  const handleDeleteCurrentSearch = () => {
    setInputValue("");
    setSearchStatus('RECENT_RECOMMENDED');
  }

  const handleDeleteAllSearches = () => {
    setRecentSearches([]);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setSearchStatus(value.length > 0 ? 'RELATED' : 'RECENT_RECOMMENDED');
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
      router.push(`/search?keyword=${encodeURIComponent(inputValue.trim())}`);
      setSearchStatus('CLOSED');
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
  const isRecentSearchContentOpen = searchStatus === 'RECENT_RECOMMENDED';
  const isRelatedSearchContentOpen = searchStatus === 'RELATED';

  useEffect(() => {
    if (searchParams.get('keyword')) {
      setInputValue(searchParams.get('keyword') || "");
    }
  }, [searchParams]);

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
          {inputValue.length > 0 && (
            <button type="button" onClick={handleDeleteCurrentSearch} className="rounded-full bg-[#EFF2F4] flex items-center justify-center">
              <X size={16} color="#898989"/>
            </button>
          )}
          <button type="button" onClick={handleInputClick}>
            {isRecentSearchContentOpen || isRelatedSearchContentOpen ? (
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
      {isRecentSearchContentOpen && (
        <RecentSearchContent
          handleDeleteAllSearches={handleDeleteAllSearches}
          recentSearches={recentSearches}
          handleDeleteSearch={handleDeleteSearch}
          recommendedSearches={recommendedSearches}
          handleCloseSearchContent={handleCloseSearchContent}
        />
      )}
      {isRelatedSearchContentOpen && (
        <RelatedSearchContent
          relatedWords={relatedWords}
          handleAddSearch={handleAddSearch}
        />
      )}
    </form>
  )
}