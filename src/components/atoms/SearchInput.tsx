"use client"

import {useState, useRef, useEffect} from "react";
import {ChevronDown, ChevronUp, Clock, Search, X} from "lucide-react";

export default function SearchInput() {
  const [isSearchContentOpen, setIsSearchContentOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputClick = () => {
    setIsSearchContentOpen((prevState) => !prevState);
  };

  const handleCloseSearchContent = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsSearchContentOpen(false);
  }

  const handleChevronClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsSearchContentOpen((prevState) => !prevState);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsSearchContentOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <form 
      ref={formRef}
      name="search" 
      method="get" 
      className="border-main border-[1.5px] w-[700px] h-[59px] relative rounded-[12px]"
    >
      <div className="flex items-center">
        <input
          onClick={handleInputClick}
          placeholder="경매 제목 입력"
          className="ml-4"
        />
        <button className="flex items-center justify-center" onClick={handleChevronClick}>
          {isSearchContentOpen ? (
            <ChevronUp size={22} />
          ) : (
            <ChevronDown size={22} />
          )}
        </button>
        <div className="h-3 border-gray-300 border-[0.5px]"/>
        <button>
          <Search size={22} />
        </button>
      </div>
      {isSearchContentOpen && (
        <div className="absolute mt-9 rounded-b-[12px] w-full -ml-[1.5px] bg-white grid gap-2 border-l-[1.5px] border-r-[1.5px] border-b-[1.5px] border-main" style={{ width: 'calc(100% + 3px)' }}>
          <div>
            최근 검색어
            <button className="group hover:bg-[#EFF2F4] h-10 w-full cursor-pointer flex items-center justify-between p-4">
              <div className="rounded-3xl bg-[#EFF2F4] h-7 w-7 flex items-center justify-center">
                <Clock size={16} />
              </div>
              최근 검색어 1
              <div className="flex items-center justify-between gap-2">
                <div>
                  25.05.01
                </div>
                <div className="">
                  <X size={22} />
                </div>
              </div>
            </button>
          </div>
          <div>
            추천 검색어
            <div>
              <button className="rounded-3xl hover:bg-red p-2 bg-[#EFF2F4] flex items-center justify-center">
                에어팟 4세대
              </button>
            </div>
          </div>
          <div>
            <button onClick={handleCloseSearchContent}>
              닫기
            </button>
          </div>
        </div>
      )}
    </form>
  )
}