"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { AuctionItem } from "@/lib/api/home";

interface RecentAuctionListProps {
  recentAuctionList: AuctionItem[];
}

export default function RecentAuctionList({
  recentAuctionList,
}: RecentAuctionListProps) {
  return (
    <div className="">
      <div className="grid grid-cols-3 gap-4">
        {recentAuctionList.map((item) => (
          <Link href={`/detail/${item.auctionId}`} key={item.auctionId}>
            <div className="relative overflow-hidden transition border-none rounded-lg cursor-pointer">
              <div className="p-2 mb-1 bg-white rounded-xl">
                <Image
                  src={`http://localhost:8080${item.thumbnailUrl}`}
                  alt={item.title}
                  width={500}
                  height={300}
                  className="rounded-xl object-cover w-full h-[130px]"
                />
              </div>

              {item.isScraped && (
                <div className="absolute p-1 rounded-full top-3 right-3">
                  <Bookmark
                    className="w-6 h-6 text-white"
                    aria-label="스크랩 아이콘"
                  />
                </div>
              )}

              <div className="p-2">
                <div className="flex justify-center items-center rounded text-[10px] text-gray-500 bg-gray-100 w-[48px] h-[18px] mb-2">
                  {item.status === "active" ? "경매중" : "경매예정"}
                </div>
                <h3 className="pb-2 mt-1 text-[16px] font-bold truncate text-main line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[16px] text-gray-600 line-clamp-1">
                  {item.description}
                </p>
                <p className="mt-2 text-[16px] font-semibold text-gray-600">
                  {item.basePrice.toLocaleString()}원
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
