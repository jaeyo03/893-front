"use client"

import RelatedSearchWordButton from "@/components/atoms/RelatedSearchWordButton";

interface RelatedSearchContentProps {
  relatedWords: string[];
  handleAddSearch: (event: React.MouseEvent, searchKeyword: string) => void;
}

export default function RelatedSearchContent({ relatedWords, handleAddSearch } : RelatedSearchContentProps) {
  return (
    <div className="absolute rounded-b-[12px] w-full -ml-[1.5px] bg-white grid gap-4 border-l-[1.5px] border-r-[1.5px] border-b-[1.5px] border-main" style={{ width: 'calc(100% + 3px)' }}>
      <div className="border-t border-t-[#E5E9EC]">
        {relatedWords.map((word, index) => (
          <RelatedSearchWordButton 
            key={index} 
            searchKeyword={word} 
            handleAddSearch={handleAddSearch}
          />
        ))}
      </div>
    </div>
  )
}