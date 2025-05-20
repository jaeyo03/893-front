// ProductHeader.tsx
'use client';

import { User } from 'lucide-react';

interface ProductHeaderProps {
  title: string;
  sellerEmail: string;
  mainCategory: string;
  subCategory: string;
  lastCategory: string;
}

export default function ProductHeader({
  title,
  sellerEmail,
  mainCategory,
  subCategory,
  lastCategory,
}: ProductHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
        <p className="font-thin">
          {mainCategory} &gt; {subCategory} &gt; {lastCategory}
        </p>
        <p className="flex items-center gap-1">
          <User className="w-4 h-4" />
          {sellerEmail}
        </p>
      </div>
    </div>
  );
}