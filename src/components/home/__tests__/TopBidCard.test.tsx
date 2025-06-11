import { render, screen, fireEvent } from "@testing-library/react";
import TopBidCard from "../TopBidCard";
import "@testing-library/jest-dom";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("TopBidCard 컴포넌트", () => {
  const props = {
    auctionId: 42,
    title: "아이폰 14 Pro",
    bidCount: 12,
    thumbnailUrl: "/iphone.jpg",
    basePrice: 1000000,
    itemPrice: 1450000,
    buyer: "applefan",
  };

  it("기본 정보가 올바르게 렌더링된다", () => {
    render(<TopBidCard {...props} />);

    expect(screen.getByText("아이폰 14 Pro")).toBeInTheDocument();
    expect(screen.getByText("낙찰자: applefan")).toBeInTheDocument();
    expect(screen.getByText("입찰수")).toBeInTheDocument();
    expect(screen.getByText("(12)")).toBeInTheDocument();
  });

  it("카드를 클릭하면 detail 페이지로 이동한다", () => {
    render(<TopBidCard {...props} />);
    fireEvent.click(screen.getByText("아이폰 14 Pro"));
    expect(push).toHaveBeenCalledWith("/detail/42");
  });
});
