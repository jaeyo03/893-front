// __tests__/AuctionSoonList.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import AuctionSoonList from "../AuctionSoonList";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";
import { act } from "react"; // ⬅️ react에서 가져오기

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("AuctionSoonItem 컴포넌트", () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("버튼 클릭 시 detail 페이지로 이동한다", () => {
    const item = {
      auctionId: 1,
      title: "테스트 아이템",
      description: "설명",
      scrapCount: 3,
      thumbnailUrl: "/test.jpg",
      itemCondition: "like_new" as const,
      basePrice: 10000,
      leftTime: "00:01:00",
    };

    act(() => {
      render(<AuctionSoonList {...item} />);
    });

    fireEvent.click(screen.getByRole("button", { name: /지금 참여하기/i }));
    expect(push).toHaveBeenCalledWith("/detail/1");
  });

  it("시간이 지나면 '경매 시작' 문구로 바뀐다", () => {
    const item = {
      auctionId: 2,
      title: "타이머 테스트",
      description: "설명입니다",
      scrapCount: 5,
      thumbnailUrl: "/test.jpg",
      itemCondition: "brand_new" as const,
      basePrice: 50000,
      leftTime: "00:00:01",
    };

    act(() => {
      render(<AuctionSoonList {...item} />);
    });

    expect(screen.getByText(/시작까지 남은 시간/i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1500); // 타이머 흐르게
    });

    expect(screen.getByText("경매 시작")).toBeInTheDocument();
  });
});
