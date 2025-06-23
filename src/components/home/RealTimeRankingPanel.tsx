import type { AuctionRankingItem } from "@/lib/api/home";
import {
  getRealTimeRankingActive,
  getRealTimeRankingPending,
} from "@/lib/api/home";
import RealTimeRankingPanelClient from "./RealTimeRankingPanelClient";

export default async function RealTimeRankingPanel() {

  const [activeRes, pendingRes] = await Promise.all([
    getRealTimeRankingActive(),
    getRealTimeRankingPending(),
  ]);

  const realTimeRankingItemActive: AuctionRankingItem[] = activeRes.data;
  const realTimeRankingItemPending: AuctionRankingItem[] = pendingRes.data;

  return (
      <RealTimeRankingPanelClient
        realTimeRankingItemActive={realTimeRankingItemActive}
        realTimeRankingItemPending={realTimeRankingItemPending}
      />
  );
}
