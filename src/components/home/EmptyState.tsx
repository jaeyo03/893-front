// components/EmptyState.tsx
"use client";

import Image from "next/image";

interface EmptyStateProps {
  message: string;
  iconSrc?: string;
  className?: string;
}

export default function EmptyState({
  message,
  iconSrc = "/icons/SearchEmpty.svg",
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`text-center text-gray-400 text-sm pt-20 pb-[240px] ${className}`}
    >
      <Image
        src={iconSrc}
        alt="Empty"
        width={100}
        height={100}
        className="mx-auto mb-4"
      />
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
}
