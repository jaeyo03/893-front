import { render, screen } from "@testing-library/react";
import TopBidCardList from "../TopBidCardList";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("TopBidCardList 컴포넌트", () => {
  it("빈 목록일 경우 EmptyState를 보여준다", () => {
    render(<TopBidCardList topBidCardList={[]} />);
    expect(
      screen.getByText("낙찰가 높은 상품이 아직 없습니다.")
    ).toBeInTheDocument();
  });

  it("리스트가 있으면 TopBidCard가 렌더링된다", () => {
    const dummyData = [
      {
        auctionId: 1,
        title: "아이템1",
        bidCount: 5,
        thumbnailUrl: "/test.jpg",
        basePrice: 10000,
        itemPrice: 15000,
        buyer: "tester",
      },
    ];
    render(<TopBidCardList topBidCardList={dummyData} />);
    expect(screen.getByText("아이템1")).toBeInTheDocument();
    expect(screen.getByText(/낙찰자: tester/)).toBeInTheDocument();
  });
});
