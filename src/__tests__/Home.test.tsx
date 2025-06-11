// ImageCarousel 컴포넌트는 실제 UI 대신 텍스트로 대체
jest.mock("@/components/home/ImageCarousel", () => {
  return function DummyImageCarousel() {
    return <div>Mocked ImageCarousel</div>;
  };
});

// next/navigation 모듈에서 useRouter, useSearchParams를 목 처리
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: (key: string) => (key === "keyword" ? "mocked-keyword" : null),
  }),
}));

// 검색 관련 API 목 처리
jest.mock("@/lib/api/searchboxApi", () => ({
  getUserSearchHistory: jest.fn().mockResolvedValue([]),
  getRelatedWords: jest.fn().mockResolvedValue([]),
}));

// next/headers에서 cookies 함수를 목 처리하여 accessToken 반환
jest.mock("next/headers", () => ({
  cookies: () => ({
    get: (key: string) =>
      key === "accessToken" ? { value: "mock-token" } : undefined,
  }),
}));

// 홈 관련 API들을 모두 목 처리
jest.mock("@/lib/api/home", () => ({
  getRecentAuctions: jest.fn().mockResolvedValue({ data: [] }),
  getDashboardStats: jest.fn().mockResolvedValue({ data: [] }),
  getAuctionSoonItems: jest.fn().mockResolvedValue({ data: [] }),
  getTopBidItems: jest.fn().mockResolvedValue({ data: [] }),
  getRealTimeRankingActive: jest.fn().mockResolvedValue({ data: [] }),
  getRealTimeRankingPending: jest.fn().mockResolvedValue({ data: [] }),
  getBestByCategory: jest.fn().mockResolvedValue({ data: [] }),
}));

// 테스트 도구 import
import { render, screen } from "@testing-library/react";
import Home from "../app/page"; // 서버 컴포넌트
import "@testing-library/jest-dom";

// Home 페이지의 주요 제목들이 정상적으로 렌더링되는지 확인하는 테스트
describe("Home 페이지 렌더링", () => {
  it("주요 섹션 제목이 화면에 표시되는지 확인", async () => {
    const ui = await Home();
    render(ui);

    expect(await screen.findByText(/경매에 참여해보세요/)).toBeInTheDocument();
    expect(await screen.findByText("경매 임박 물품")).toBeInTheDocument();
    expect(
      await screen.findByText("최근 7일 최고 낙찰가 TOP 5")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("카테고리별 베스트 TOP3")
    ).toBeInTheDocument();
  });
});
