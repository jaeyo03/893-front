import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import EditRegistration from "../app/edit/[idx]/page";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
window.HTMLElement.prototype.scrollIntoView = jest.fn();
jest.mock("axios");
jest.mock("react-hot-toast", () => ({ error: jest.fn(), success: jest.fn() }));
jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));

// Mocked child components
jest.mock("@/components/registration/ImageUploader", () => ({
  __esModule: true,
  default: ({ onChange }: any) => (
    <div
      data-testid="image-uploader"
      onClick={() => onChange([new File([], "file.png")])}
    />
  ),
}));
jest.mock("@/components/registration/AuctionTitleInput", () => ({
  __esModule: true,
  default: ({ onChange }: any) => (
    <input
      data-testid="title-input"
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));
jest.mock("@/components/registration/PaymentInput", () => ({
  __esModule: true,
  default: ({ onChange }: any) => (
    <input
      data-testid="payment-input"
      type="number"
      onChange={(e) => onChange(Number(e.target.value))}
    />
  ),
}));
jest.mock("@/components/registration/DetailedInput", () => ({
  __esModule: true,
  default: ({ onChange }: any) => (
    <textarea
      data-testid="detail-input"
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));
jest.mock("@/components/registration/ProductStatus", () => ({
  __esModule: true,
  default: ({ onChange }: any) => (
    <div data-testid="product-status" onClick={() => onChange(0)} />
  ),
}));
jest.mock("@/components/registration/CategorySelect", () => ({
  __esModule: true,
  default: ({ onChange }: any) => (
    <div
      data-testid="category-selector"
      onClick={() =>
        onChange({
          id: 1,
          mainCategory: "M",
          subCategory: "S",
          detailCategory: "D",
        })
      }
    />
  ),
}));
jest.mock("@/components/registration/SellerAgreementCheckbox", () => ({
  __esModule: true,
  default: ({ onChange }: any) => (
    <div data-testid="agreement-checkbox" onClick={() => onChange(true)} />
  ),
}));
jest.mock("@/components/registration/AuctionStartTimeButton", () => ({
  __esModule: true,
  default: ({ onChange }: any) => (
    <div
      data-testid="start-time-button"
      onClick={() => onChange({ hour: 1, minute: 0 })}
    />
  ),
}));
jest.mock("@/components/registration/AuctionTimeButton", () => ({
  __esModule: true,
  default: ({ onChange }: any) => (
    <div
      data-testid="duration-time-button"
      onClick={() => onChange({ hour: 2, minute: 0 })}
    />
  ),
}));
jest.mock("@/components/registration/SellButton", () => ({
  __esModule: true,
  default: ({ onClick, onConfirm }: any) => (
    <>
      <button data-testid="edit-button" onClick={onClick}>
        수정하기
      </button>
      <button data-testid="confirm-button" onClick={onConfirm}>
        확인
      </button>
    </>
  ),
}));

describe("Edit 테스트", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        data: {
          category: {
            id: 1,
            mainCategory: "M",
            subCategory: "S",
            detailCategory: "D",
          },
          title: "기존 제목",
          basePrice: 10000,
          description: "기존 설명",
          itemCondition: "gently_used",
          images: [],
        },
      },
    });
  });

  const fillForm = () => {
    fireEvent.click(screen.getByTestId("image-uploader"));
    fireEvent.change(screen.getByTestId("title-input"), {
      target: { value: "새 제목" },
    });
    fireEvent.click(screen.getByTestId("category-selector"));
    fireEvent.change(screen.getByTestId("payment-input"), {
      target: { value: "20000" },
    });
    fireEvent.change(screen.getByTestId("detail-input"), {
      target: { value: "상세" },
    });
    fireEvent.click(screen.getByTestId("product-status"));
    fireEvent.click(screen.getByTestId("start-time-button"));
    fireEvent.click(screen.getByTestId("duration-time-button"));
    fireEvent.click(screen.getByTestId("agreement-checkbox"));
  };

  it("수정 성공 시 상세페이지 이동", async () => {
    (axios.patch as jest.Mock).mockResolvedValue({});
    render(<EditRegistration params={{ idx: 99 }} />);
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    fillForm();
    fireEvent.click(screen.getByTestId("edit-button"));
    fireEvent.click(screen.getByTestId("confirm-button"));

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith(
        expect.stringContaining("/detail/99")
      );
    });
  });

  it("수정 실패 시 toast 에러 출력", async () => {
    (axios.patch as jest.Mock).mockRejectedValue(new Error("fail"));
    render(<EditRegistration params={{ idx: 99 }} />);
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    fillForm();
    fireEvent.click(screen.getByTestId("edit-button"));
    fireEvent.click(screen.getByTestId("confirm-button"));

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it("유효성 실패 시 patch 호출 안됨", async () => {
    render(<EditRegistration params={{ idx: 99 }} />);
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // 입력 없이 버튼만 클릭
    fireEvent.click(screen.getByTestId("edit-button"));
    fireEvent.click(screen.getByTestId("confirm-button"));

    await waitFor(() => {
      expect(axios.patch).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});
