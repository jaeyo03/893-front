"use client"

import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FilterRefreshButton() {
  const router = useRouter()
  
  const handleRefresh = () => {
    router.replace(`/search`)
  }

  return (
    <button className="flex items-center gap-2 text-sm text-gray-500" onClick={handleRefresh}>
      초기화
      <RefreshCcw size={20}/>
    </button>
  )
}