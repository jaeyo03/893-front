import fetchMock from "jest-fetch-mock";

import {
  getRecentAuctions,
  getDashboardStats,
  getAuctionSoonItems,
  getTopBidItems,
  getRealTimeRankingActive,
  getRealTimeRankingPending,
  getBestByCategory,
} from "@/lib/api/home";

describe("API 호출 실패 케이스 테스트: home.ts", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("getRecentAuctions 실패 케이스", async () => {
    fetchMock.mockRejectOnce(() => Promise.reject("API error"));
    await expect(getRecentAuctions()).rejects.toThrow(
      "최근 경매 목록 불러오기 실패"
    );
  });

  it("getDashboardStats 실패 케이스", async () => {
    fetchMock.mockRejectOnce(() => Promise.reject("API error"));
    await expect(getDashboardStats()).rejects.toThrow(
      "대시보드 통계 불러오기 실패"
    );
  });

  it("getAuctionSoonItems 실패 케이스", async () => {
    fetchMock.mockRejectOnce(() => Promise.reject("API error"));
    await expect(getAuctionSoonItems()).rejects.toThrow(
      "경매 임박 상품 불러오기 실패"
    );
  });

  it("getTopBidItems 실패 케이스", async () => {
    fetchMock.mockRejectOnce(() => Promise.reject("API error"));
    await expect(getTopBidItems()).rejects.toThrow(
      "상위 입찰 상품 불러오기 실패"
    );
  });

  it("getRealTimeRankingActive 실패 케이스", async () => {
    fetchMock.mockRejectOnce(() => Promise.reject("API error"));
    await expect(getRealTimeRankingActive()).rejects.toThrow(
      "실시간 경매 랭킹 불러오기 실패"
    );
  });

  it("getRealTimeRankingPending 실패 케이스", async () => {
    fetchMock.mockRejectOnce(() => Promise.reject("API error"));
    await expect(getRealTimeRankingPending()).rejects.toThrow(
      "실시간 경매 랭킹 불러오기 실패"
    );
  });

  it("getBestByCategory 실패 케이스", async () => {
    fetchMock.mockRejectOnce(() => Promise.reject("API error"));
    await expect(getBestByCategory()).rejects.toThrow(
      "카테고리별 베스트 불러오기 실패"
    );
  });
});
