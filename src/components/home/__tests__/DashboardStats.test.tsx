import { render, screen } from "@testing-library/react";
import DashboardStats from "../DashboardStats.tsx";
import "@testing-library/jest-dom";

// 테스트에 사용할 mock 데이터
const mockStats = {
  totalUserCount: 1234,
  totalAuctionCount: 56,
  activeAuctionCount: 7,
};

describe("DashboardStats 컴포넌트", () => {
  it("각 통계 항목이 올바르게 렌더링되는지 확인", () => {
    render(<DashboardStats dashboardStats={mockStats} />);

    // 각 항목의 label과 값이 화면에 표시되는지 확인
    expect(screen.getByText("현재 이용자 수")).toBeInTheDocument();
    expect(screen.getByText("1,234")).toBeInTheDocument();

    expect(screen.getByText("현재 등록된 경매 수")).toBeInTheDocument();
    expect(screen.getByText("56")).toBeInTheDocument();

    expect(screen.getByText("현재 진행중인 경매 수")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
  });
});
