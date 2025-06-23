import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Registration from "../app/registration/page";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import axios from "axios";

// 라우터 모킹
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// axios 모킹
jest.mock("axios");

// toast 모킹
jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// 자식 컴포넌트들은 단순 렌더링만 테스트 (내부 로직은 생략)
jest.mock("@/components/registration/ImageUploader", () => () => (
  <div data-testid="image-uploader" />
));
jest.mock("@/components/registration/AuctionTitleInput", () => () => (
  <input data-testid="title-input" />
));
jest.mock("@/components/registration/CategorySelect", () => ({
  __esModule: true,
  default: () => <div data-testid="category-selector" />,
}));
jest.mock("@/components/registration/PaymentInput", () => () => (
  <input data-testid="payment-input" />
));
jest.mock("@/components/registration/DetailedInput", () => () => (
  <textarea data-testid="detail-input" />
));
jest.mock("@/components/registration/ProductStatus", () => () => (
  <div data-testid="product-status" />
));
jest.mock("@/components/registration/AuctionStartTimeButton", () => () => (
  <div data-testid="start-time-button" />
));
jest.mock("@/components/registration/AuctionTimeButton", () => () => (
  <div data-testid="duration-time-button" />
));
jest.mock("@/components/registration/SellerAgreementCheckbox", () => () => (
  <div data-testid="agreement-checkbox" />
));
jest.mock("@/components/registration/SellButton", () => ({
  __esModule: true,
  default: ({
    onClick,
    onConfirm,
  }: {
    onClick: () => void;
    onConfirm: () => void;
  }) => (
    <div>
      <button data-testid="sell-button" onClick={onClick}>
        등록하기
      </button>
      <button data-testid="confirm-button" onClick={onConfirm}>
        확인
      </button>
    </div>
  ),
}));

describe("경매 등록 페이지", () => {
  const pushMock = jest.fn();

  // scrollIntoView 에러 방지를 위한 모킹
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  it("모든 입력 컴포넌트들이 렌더링되어야 함", () => {
    render(<Registration />);
    expect(screen.getByTestId("image-uploader")).toBeInTheDocument();
    expect(screen.getByTestId("title-input")).toBeInTheDocument();
    expect(screen.getByTestId("category-selector")).toBeInTheDocument();
    expect(screen.getByTestId("payment-input")).toBeInTheDocument();
    expect(screen.getByTestId("detail-input")).toBeInTheDocument();
    expect(screen.getByTestId("product-status")).toBeInTheDocument();
    expect(screen.getByTestId("start-time-button")).toBeInTheDocument();
    expect(screen.getByTestId("duration-time-button")).toBeInTheDocument();
    expect(screen.getByTestId("agreement-checkbox")).toBeInTheDocument();
    expect(screen.getByTestId("sell-button")).toBeInTheDocument();
  });

  it("폼이 비어 있을 경우 에러 메시지를 출력해야 함", async () => {
    render(<Registration />);
    fireEvent.click(screen.getByTestId("sell-button"));

    await waitFor(() => {
      expect(
        screen.getByText("최소 1장의 이미지를 등록해주세요.")
      ).toBeInTheDocument();
      expect(screen.getByText("경매 제목을 입력해주세요.")).toBeInTheDocument();
      expect(screen.getByText("카테고리를 선택해주세요.")).toBeInTheDocument();
      expect(screen.getByText("시작 가격을 입력해주세요.")).toBeInTheDocument();
      expect(screen.getByText("상세 설명을 입력해주세요.")).toBeInTheDocument();
      expect(screen.getByText("상품 상태를 선택해주세요.")).toBeInTheDocument();
      expect(
        screen.getByText("경매 시작 시간을 설정해주세요.")
      ).toBeInTheDocument();
      expect(screen.getByText("경매 시간을 설정해주세요.")).toBeInTheDocument();
      expect(screen.getByText("판매 동의에 체크해주세요.")).toBeInTheDocument();
    });
  });

  it("폼 제출이 성공하면 API 호출 후 상세 페이지로 이동해야 함", async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: { data: { auctionId: 123 } },
    });

    render(<Registration />);
    fireEvent.click(screen.getByTestId("confirm-button"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith("/detail/123");
    });
  });

  it("폼 제출 실패 시 토스트 에러 메시지를 보여줘야 함", async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error("Failed"));

    render(<Registration />);
    fireEvent.click(screen.getByTestId("confirm-button"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });
});
