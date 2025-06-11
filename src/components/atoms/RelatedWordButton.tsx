"use client"
import Link from "next/link";

export default function RelatedWordButton({ label }: { label: string }) {
  return (
    <Link href={`/search?keyword=${encodeURIComponent(label)}`} className="bg-[#F8F9FD] rounded-3xl py-1 px-4 border-[1px] border-[#EEEFF3]">
      {label}
    </Link>
  )
}