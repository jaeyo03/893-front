import { render, screen } from "@testing-library/react";
import RecentAuctionList from "../RecentAuctionList";
import "@testing-library/jest-dom";
import { AuctionItem } from "@/lib/api/home";

// 목 데이터
const mockItems: AuctionItem[] = [
  {
    auctionId: 1,
    title: "아이폰 14 미개봉",
    description: "새상품입니다",
    thumbnailUrl: "/images/iphone.jpg",
    basePrice: 1000000,
    isScraped: true,
    status: "active",
  },
  {
    auctionId: 2,
    title: "갤럭시 Z플립",
    description: "최신 모델",
    thumbnailUrl: "/images/galaxy.jpg",
    basePrice: 800000,
    isScraped: false,
    status: "pending",
  },
];

describe("RecentAuctionList", () => {
  it("비어 있는 경우 EmptyState를 렌더링해야 한다", () => {
    render(<RecentAuctionList recentAuctionList={[]} />);
    expect(
      screen.getByText("최근 등록된 경매 물품이 없습니다.")
    ).toBeInTheDocument();
  });

  it("최근 경매 아이템들을 렌더링해야 한다", () => {
    render(<RecentAuctionList recentAuctionList={mockItems} />);
    expect(screen.getByText("아이폰 14 미개봉")).toBeInTheDocument();
    expect(screen.getByText("갤럭시 Z플립")).toBeInTheDocument();
  });

  it("스크랩된 아이템에는 북마크 아이콘이 포함되어야 한다", () => {
    render(<RecentAuctionList recentAuctionList={mockItems} />);
    const bookmarkIcons = screen.getAllByLabelText("스크랩 아이콘");
    expect(bookmarkIcons.length).toBe(1);
  });

  it("경매 상태 텍스트를 올바르게 렌더링해야 한다", () => {
    render(<RecentAuctionList recentAuctionList={mockItems} />);
    expect(screen.getByText("경매중")).toBeInTheDocument();
    expect(screen.getByText("경매예정")).toBeInTheDocument();
  });
});
