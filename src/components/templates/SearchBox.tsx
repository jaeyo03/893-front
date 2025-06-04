"use client"

import React, {useState, useRef, useEffect} from "react";
import {ChevronDown, ChevronUp, Search, X} from "lucide-react";
import searchData from "@/data/searchData.json";
import { useRouter, useSearchParams } from "next/navigation";
import RecentSearchContent from "../molecules/searchinput/RecentSearchContent";
import RelatedSearchContent from "../molecules/searchinput/RelatedSearchContent";
import { useQueryClient } from "@tanstack/react-query";
import { useAddSearchHistory, useDeleteSearchHistory, useRelatedWords, useSearchHistory } from "@/hooks/useSearchBox";
type SearchStatus = 'CLOSED' | 'RECENT_RECOMMENDED' | 'RELATED';

interface SearchBoxProps {
  isLoggedIn: boolean;
}

export default function SearchBox({ isLoggedIn }: SearchBoxProps) {
  const router = useRouter();
  const [searchStatus, setSearchStatus] = useState<SearchStatus>('CLOSED');
  const formRef = useRef<HTMLFormElement>(null);
  const [popularSearches] = useState(searchData.popularSearches); // TODO 추후 백엔드 연동
  const searchParams = useSearchParams()
  const currentKeyword = searchParams.get('keyword')
  const [inputValue, setInputValue] = useState(currentKeyword || "");
  const [debouncedInputValue, setDebouncedInputValue] = useState(inputValue);
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  const {data : searchHistory} = useSearchHistory(isLoggedIn);
  const {data : relatedWords} = useRelatedWords(debouncedInputValue);
  const deleteHistoryMutation = useDeleteSearchHistory(isLoggedIn);
  const addHistoryMutation = useAddSearchHistory(isLoggedIn);
  
  const handleInputClick = () => {
    if (searchStatus === 'CLOSED') {
      queryClient.invalidateQueries({ queryKey: ['searchHistory', isLoggedIn] });
      setSearchStatus(inputValue.length > 0 ? 'RELATED' : 'RECENT_RECOMMENDED');
    } else {
      setSearchStatus('CLOSED');
    }
  };

  const handleCloseSearchContent = () => {
    setSearchStatus('CLOSED');
  }

  const handleDeleteSearch = (id: number) => {
    deleteHistoryMutation.mutate(id);
  }

  const handleDeleteCurrentSearch = () => {
    setInputValue("");
    setSearchStatus('RECENT_RECOMMENDED');
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    if (value.length <= 30) {
      setInputValue(value);
      setSearchStatus(value.length > 0 ? 'RELATED' : 'RECENT_RECOMMENDED');
    } else {
      alert("검색어는 30자 이하로 입력해주세요.");
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
    if (inputValue.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }

    addHistoryMutation.mutate(inputValue);
    
    if (inputValue.trim()) {
      router.push(`/search?keyword=${inputValue.trim()}`);
      setSearchStatus('CLOSED');
    }
  }

  const handleClickWordButton = (event: React.MouseEvent, searchKeyword: string) => {
    event.preventDefault();
    addHistoryMutation.mutate(searchKeyword);
    if (searchKeyword.trim()) {
      router.push(`/search?keyword=${searchKeyword.trim()}`);
      setSearchStatus('CLOSED');
    }
  }

  const isSearchContentOpen = searchStatus !== 'CLOSED';
  const isRecentSearchContentOpen = searchStatus === 'RECENT_RECOMMENDED';
  const isRelatedSearchContentOpen = searchStatus === 'RELATED';

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
            <button aria-label="현재 입력 검색어 삭제" type="button" onClick={handleDeleteCurrentSearch} className="rounded-full bg-[#EFF2F4] flex items-center justify-center">
              <X size={16} color="#898989"/>
            </button>
          )}
          <button aria-label="검색 관련 창 토글" type="button" onClick={handleInputClick}>
            {isRecentSearchContentOpen || isRelatedSearchContentOpen ? (
              <ChevronUp size={22} />
            ) : (
              <ChevronDown size={22} />
            )}
          </button>
          <div className="h-3 border-gray-300 border-[0.5px]"/>
          <button aria-label="검색" type="submit">
            <Search size={22} />
          </button>
        </div>
      </div>
      {isRecentSearchContentOpen && (
        <RecentSearchContent
          recentSearches={searchHistory || []}
          handleDeleteSearch={handleDeleteSearch}
          popularSearches={popularSearches}
          handleCloseSearchContent={handleCloseSearchContent}
          handleClickWordButton={handleClickWordButton}
        />
      )}
      {isRelatedSearchContentOpen && (
        <RelatedSearchContent
          relatedWords={relatedWords?.data || []}
          handleAddSearch={handleAddSearch}
          handleClickWordButton={handleClickWordButton}
        />
      )}
    </form>
  )
}