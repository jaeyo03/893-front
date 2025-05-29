"use client"

interface PopularSearchWordButtonProps {
  searchWord: string;
  handleClickWordButton: (event: React.MouseEvent, searchKeyword: string) => void;
}

export default function PopularSearchWordButton({ searchWord, handleClickWordButton } : PopularSearchWordButtonProps) {
  return (
    <div
      className="rounded-3xl hover:bg-[#DBE3FB] cursor-pointer p-2 bg-[#EFF2F4] flex items-center justify-center"
      onClick={(e) => handleClickWordButton(e, searchWord)}
    >
      {searchWord}
    </div>
  )
}