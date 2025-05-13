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
        <p className="flex items-center gap-1 text-gray-600">
          <User className="w-4 h-4" />
          {sellerEmail}
        </p>
      </div>
      <p className="text-xs font-thin">
        {mainCategory} &gt; {subCategory} &gt; {lastCategory}
      </p>
    </div>
  );
}
