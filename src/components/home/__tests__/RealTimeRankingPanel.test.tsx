// __tests__/RealTimeRankingPanel.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import RealTimeRankingPanel from "../RealTimeRankingItem";
import { AuctionRankingItem } from "@/lib/api/home";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

describe("RealTimeRankingPanel", () => {
  const activeItems: AuctionRankingItem[] = [
    {
      auctionId: 1,
      rankNum: 1,
      title: "아이템 1",
      description: "설명 1",
      itemCondition: "brand_new",
      bidCount: 5,
      scrapCount: 10,
      thumbnailUrl: "/thumbnail1.jpg",
      status: "active",
    },
  ];

  const upcomingItems: AuctionRankingItem[] = [
    {
      auctionId: 2,
      rankNum: 1,
      title: "아이템 2",
      description: "설명 2",
      itemCondition: "like_new",
      bidCount: 0,
      scrapCount: 7,
      thumbnailUrl: "/thumbnail2.jpg",
      status: "upcoming",
    },
  ];

  it("경매중 탭에서 항목이 렌더링된다", () => {
    render(
      <RealTimeRankingPanel
        realTimeRankingItemActive={activeItems}
        realTimeRankingItemPending={[]}
      />
    );
    expect(screen.getByText("아이템 1")).toBeInTheDocument();
    expect(screen.getByText("현재 입찰 수: 5회")).toBeInTheDocument();
  });

  it("경매예정 탭으로 전환하고 항목 렌더링 확인", () => {
    render(
      <RealTimeRankingPanel
        realTimeRankingItemActive={[]}
        realTimeRankingItemPending={upcomingItems}
      />
    );

    fireEvent.click(screen.getByText("경매예정"));

    expect(screen.getByText("아이템 2")).toBeInTheDocument();
    expect(screen.getByText("스크랩 7")).toBeInTheDocument();
  });

  it("아이템 클릭 시 detail 페이지로 이동한다", () => {
    render(
      <RealTimeRankingPanel
        realTimeRankingItemActive={activeItems}
        realTimeRankingItemPending={[]}
      />
    );
    fireEvent.click(screen.getByText("아이템 1"));
    expect(mockPush).toHaveBeenCalledWith("/detail/1");
  });

  it("두 탭 모두 비어있으면 EmptyState가 표시된다", () => {
    render(
      <RealTimeRankingPanel
        realTimeRankingItemActive={[]}
        realTimeRankingItemPending={[]}
      />
    );
    expect(
      screen.getByText("실시간 경매중인 물품이 없습니다.")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("경매예정"));

    expect(
      screen.getByText("실시간 예정된 경매가 없습니다.")
    ).toBeInTheDocument();
  });

  it("탭 버튼 스타일이 올바르게 반영된다", () => {
    render(
      <RealTimeRankingPanel
        realTimeRankingItemActive={activeItems}
        realTimeRankingItemPending={upcomingItems}
      />
    );

    const activeBtn = screen.getByText("경매진행중");
    const upcomingBtn = screen.getByText("경매예정");

    expect(activeBtn).toHaveClass("bg-black text-white");
    expect(upcomingBtn).toHaveClass("bg-gray-200");

    fireEvent.click(upcomingBtn);

    expect(activeBtn).toHaveClass("bg-gray-200");
    expect(upcomingBtn).toHaveClass("bg-black text-white");
  });
});
