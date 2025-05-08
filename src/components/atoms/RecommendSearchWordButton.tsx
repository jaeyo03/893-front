"use client"
import Link from "next/link"

export default function RecommendSearchWord({searchWord} : {searchWord : string}) {
  return (
    <Link href={`/search?keyword=${searchWord}`} className="rounded-3xl hover:bg-[#DBE3FB] p-2 bg-[#EFF2F4] flex items-center justify-center">
      {searchWord}
    </Link>
  )
}