// components/DashboardStats.tsx
"use client";

import React from "react";

interface StatCardProps {
  label: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
  <div className="border rounded-sm p-4 w-[246px] h-[100px]">
    <p className="text-sm text-main font-semibold">{label}</p>
    <p className="text-2xl font-bold mt-4">{value.toLocaleString()}</p>
  </div>
);

interface DashboardStatsProps {
  stats: StatCardProps[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
};

export default DashboardStats;
