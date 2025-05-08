"use client"

import { Clock, X } from "lucide-react";
import Link from "next/link";

interface RecentSearchWordButtonProps {
	searchKeywordId: number;
	searchKeyword: string;
	createdAt: string;
	handleDeleteSearch: (searchKeywordId: number) => void;
}

export default function RecentSearchWordButton({ searchKeywordId, searchKeyword, createdAt, handleDeleteSearch } : RecentSearchWordButtonProps) {
  return (
    <Link href={`/search?keyword=${searchKeyword}`} className="group hover:bg-[#EFF2F4] h-10 w-full cursor-pointer flex items-center justify-between p-4">
			<div className="flex items-center justify-center gap-2">
				<div className="rounded-3xl bg-[#EFF2F4] h-7 w-7 flex items-center justify-center">
					<Clock size={16} />
				</div>
				<div>
					{searchKeyword}
				</div>
			</div>
			<div className="flex items-center justify-between gap-2">
				<div className="text-[#898989]">
					{createdAt}
				</div>
				<div 
					className="cursor-pointer"
					onClick={() => handleDeleteSearch(searchKeywordId)}
				>
					<X size={22} color="#898989" className="hover:text-[#6c6c6c]"/>
				</div>
			</div>
  	</Link>
  )
}