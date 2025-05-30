// components/home/DashboardStats.tsx
"use client";

import React, { useEffect, useState } from "react";
import { fetchDashboardStats } from "@/lib/api/home";

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

const DashboardStats: React.FC = () => {
  const [stats, setStats] = useState<StatCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await fetchDashboardStats();
        const transformed: StatCardProps[] = [
          { label: "현재 이용자 수", value: data.totalUserCount },
          { label: "현재 등록된 경매 수", value: data.totalAuctionCount },
          { label: "현재 진행중인 경매 수", value: data.activeAuctionCount },
        ];
        setStats(transformed);
      } catch (error) {
        console.error("Dashboard 통계 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
};

export default DashboardStats;
