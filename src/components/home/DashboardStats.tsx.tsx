"use client";

import { DashboardStatsResponse } from "@/lib/api/home";

interface DashboardStatsProps {
  dashboardStats: DashboardStatsResponse;
}

interface StatCardProps {
  label: string;
  value: number;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="border rounded-sm p-4 w-[246px] h-[100px]">
      <p className="text-sm text-main font-semibold">{label}</p>
      <p className="text-2xl font-bold mt-4">{value?.toLocaleString()}</p>
    </div>
  );
}

export default function DashboardStats({
  dashboardStats,
}: DashboardStatsProps) {
  const statDataList: StatCardProps[] = [
    { label: "현재 이용자 수", value: dashboardStats?.totalUserCount },
    { label: "현재 등록된 경매 수", value: dashboardStats?.totalAuctionCount },
    {
      label: "현재 진행중인 경매 수",
      value: dashboardStats?.activeAuctionCount,
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {statDataList.map((stat, index) => (
        <StatCard key={index} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
}
