import { render, screen } from "@testing-library/react";
import AuctionSoonItemList from "../AuctionSoonItemList";
import "@testing-library/jest-dom";
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));
describe("AuctionSoonItemList 컴포넌트", () => {
  it("빈 배열일 경우 EmptyState가 렌더링된다", () => {
    render(<AuctionSoonItemList auctionSoonItemList={[]} />);
    expect(
      screen.getByText("곧 시작할 경매 물품이 없습니다.")
    ).toBeInTheDocument();
  });

  it("3개 이하의 항목이 있을 경우 정상 렌더링된다", () => {
    const items = [
      {
        auctionId: 1,
        title: "아이템 1",
        description: "설명 1",
        scrapCount: 2,
        thumbnailUrl: "/img1.jpg",
        itemCondition: "brand_new" as const,
        basePrice: 1000,
        leftTime: "00:01:00",
      },
      {
        auctionId: 2,
        title: "아이템 2",
        description: "설명 2",
        scrapCount: 3,
        thumbnailUrl: "/img2.jpg",
        itemCondition: "gently_used" as const,
        basePrice: 2000,
        leftTime: "00:02:00",
      },
    ];

    render(<AuctionSoonItemList auctionSoonItemList={items} />);
    expect(screen.getByText("아이템 1")).toBeInTheDocument();
    expect(screen.getByText("아이템 2")).toBeInTheDocument();
  });

  it("항목이 4개 이상일 경우 최대 3개까지만 렌더링된다", () => {
    const items = Array.from({ length: 4 }, (_, i) => ({
      auctionId: i + 1,
      title: `아이템 ${i + 1}`,
      description: `설명 ${i + 1}`,
      scrapCount: i + 1,
      thumbnailUrl: `/img${i + 1}.jpg`,
      itemCondition: "like_new" as const,
      basePrice: 10000 + i * 1000,
      leftTime: "00:03:00",
    }));

    render(<AuctionSoonItemList auctionSoonItemList={items} />);

    expect(screen.getByText("아이템 1")).toBeInTheDocument();
    expect(screen.getByText("아이템 2")).toBeInTheDocument();
    expect(screen.getByText("아이템 3")).toBeInTheDocument();
    expect(screen.queryByText("아이템 4")).not.toBeInTheDocument();
  });
});
