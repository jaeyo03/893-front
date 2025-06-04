// __tests__/BestByCategory.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import BestByCategory from "../BestItemByCategory";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";
import { BestCategoryGroup } from "@/lib/api/home";
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeAll(() => {
  Element.prototype.scrollTo = jest.fn();
});
describe("BestByCategory 컴포넌트", () => {
  const push = jest.fn();
  const mockData: BestCategoryGroup[] = [
    {
      subCategoryId: 1,
      subCategoryName: "노트북",
      items: [
        {
          auctionId: 101,
          title: "맥북 에어 M2",
          scrapCount: 10,
          thumbnailUrl: "/macbook.jpg",
          itemCondition: "like_new",
          rankNum: 1,
          status: "active",
          isAuctionImminent: true,
        },
      ],
    },
    {
      subCategoryId: 2,
      subCategoryName: "스마트폰",
      items: [],
    },
  ];
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    push.mockClear();
  });

  it("탭을 클릭하면 해당 카테고리 아이템이 보인다", () => {
    render(<BestByCategory bestByCategory={mockData} />);
    expect(screen.getByText("맥북 에어 M2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("스마트폰"));
    expect(
      screen.getByText("해당 카테고리에 등록된 상품이 없습니다.")
    ).toBeInTheDocument();
  });

  it("아이템을 클릭하면 상세 페이지로 이동한다", () => {
    render(<BestByCategory bestByCategory={mockData} />);
    fireEvent.click(screen.getByText("맥북 에어 M2"));
    expect(push).toHaveBeenCalledWith("/detail/101");
  });
});
