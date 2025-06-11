import '@testing-library/jest-dom'
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBox from "@/components/templates/SearchBox";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  useSearchHistory,
  useRelatedWords,
  useAddSearchHistory,
  useDeleteSearchHistory,
} from "@/hooks/useSearchBox";

function setMockData() {
  (useSearchHistory as jest.Mock).mockReturnValue({
    data: [
      { id: 1, keyword: "테스트1" },
      { id: 2, keyword: "테스트2" },
    ],
  });
  (useRelatedWords as jest.Mock).mockReturnValue({
    data: { data: ["apple", "apricot", "application"] },
  });
}

function setEmptyMockData() {
  (useSearchHistory as jest.Mock).mockReturnValue({ data: [] });
  (useRelatedWords as jest.Mock).mockReturnValue({ data: { data: [] } });
}

// ---------------------------------------------------
// 1) next/navigation 훅 모킹
// ---------------------------------------------------
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// ---------------------------------------------------
// 2) React Query의 useQueryClient 모킹
// ---------------------------------------------------
jest.mock("@tanstack/react-query", () => ({
  useQueryClient: jest.fn(),
}));

// ---------------------------------------------------
// 3) 커스텀 훅(useSearchBox) 모킹
// ---------------------------------------------------
jest.mock("../hooks/useSearchBox", () => ({
  useSearchHistory: jest.fn(),
  useRelatedWords: jest.fn(),
  useAddSearchHistory: jest.fn(),
  useDeleteSearchHistory: jest.fn(),
}));

describe("SearchBox 컴포넌트", () => {
  const mockPush = jest.fn();
  const mockInvalidateQueries = jest.fn();
  const mockMutateAdd = { mutate: jest.fn() };
  const mockMutateDelete = { mutate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();

    // --- useRouter 모킹 ---
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    // --- useSearchParams 모킹: 초기에는 키워드 없음(null) ---
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    // --- useQueryClient 모킹 ---
    (useQueryClient as jest.Mock).mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
    });

    // --- useAddSearchHistory, useDeleteSearchHistory 모킹 ---
    (useAddSearchHistory as jest.Mock).mockReturnValue(mockMutateAdd);
    (useDeleteSearchHistory as jest.Mock).mockReturnValue(mockMutateDelete);
  });

  test("초기 렌더링 시 토글 버튼과 검색 버튼이 화면에 보여야 한다", async () => {
    setMockData();

    render(<SearchBox isLoggedIn={true} />);

    const input = screen.getByPlaceholderText("경매 제목 입력");
    expect(input).toBeInTheDocument();

    const toggleButton = screen.getByRole("button", { name: "검색 관련 창 토글" });
    const searchButton = screen.getByRole("button", { name: "검색" });
    expect(toggleButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    const deleteButton = screen.queryByRole("button", { name: "현재 입력 검색어 삭제" });
    expect(deleteButton).toBeNull();

    const recentSearchContent = screen.queryByText("최근 검색어");
    expect(recentSearchContent).toBeNull();

    const popularSearchContent = screen.queryByText("인기 검색어");
    expect(popularSearchContent).toBeNull();
  });

  test("입력창 클릭 시 검색어가 없으면 검색 창 상태가 'RECENT_RECOMMENDED'로 변경되고, 최근 검색어 목록이 보여야 한다", async () => {
    setMockData();

    render(<SearchBox isLoggedIn={true} />);

    const input = screen.getByPlaceholderText("경매 제목 입력");
    fireEvent.click(input);

    expect(mockInvalidateQueries).toHaveBeenCalledWith({ queryKey: ["searchHistory", true] });
    expect(screen.getByText("최근 검색어")).toBeInTheDocument();

    const recentSearchButton1 = await screen.findByRole("button", { name: "최근 검색어 검색 테스트1 버튼" });
    const recentSearchButton2 = await screen.findByRole("button", { name: "최근 검색어 검색 테스트2 버튼" });
    expect(recentSearchButton1).toBeInTheDocument();
    expect(recentSearchButton2).toBeInTheDocument();

    expect(screen.getByText("테스트1")).toBeInTheDocument();
    expect(screen.getByText("테스트2")).toBeInTheDocument();

    expect(screen.getByText("에어팟 4세대")).toBeInTheDocument();
    expect(screen.getByText("아이폰 15")).toBeInTheDocument();
    expect(screen.getByText("맥북 프로")).toBeInTheDocument();
    expect(screen.getByText("애플워치")).toBeInTheDocument();
    expect(screen.getByText("갤럭시 S24")).toBeInTheDocument();
  });

  test("입력값을 타이핑하면 관련 검색어 목록이 표시되고, 타이핑 길이가 30자 이상이면 alert 호출", async () => {
    setMockData();

    window.alert = jest.fn();

    render(<SearchBox isLoggedIn={false} />);

    const input = screen.getByPlaceholderText("경매 제목 입력");
    fireEvent.click(input);

    fireEvent.change(input, { target: { value: "app" } });

    await waitFor(() => {
      expect(screen.getByText("apricot")).toBeInTheDocument();
      expect(screen.getByText("apple")).toBeInTheDocument();
      expect(screen.getByText("application")).toBeInTheDocument();
    });

    const longString = "a".repeat(30);
    fireEvent.change(input, { target: { value: longString } });
    expect(window.alert).not.toHaveBeenCalled();

    const longString2 = "a".repeat(31);
    fireEvent.change(input, { target: { value: longString2 } });
    expect(window.alert).toHaveBeenCalledWith("검색어는 30자 이하로 입력해주세요.");
  });

  test("현재 검색어 삭제 버튼 클릭 시 input 값이 초기화되고 상태가 'RECENT_RECOMMENDED'로 돌아가야 한다", async () => {
    setMockData();

    render(<SearchBox isLoggedIn={true} />);

    const input = screen.getByPlaceholderText("경매 제목 입력");
    fireEvent.change(input, { target: { value: "keyword" } });

    const xButton = screen.getByRole("button", { name: "현재 입력 검색어 삭제" });
    fireEvent.click(xButton);

    expect((input as HTMLInputElement).value).toBe("");

    expect(screen.getByText("최근 검색어")).toBeInTheDocument();
    expect(screen.getByText("테스트1")).toBeInTheDocument();
    expect(screen.getByText("테스트2")).toBeInTheDocument();
  });

  test("검색 폼 제출 시 addHistoryMutation.mutate와 router.push가 호출되어야 한다", async () => {


    render(<SearchBox isLoggedIn={false} />);

    const input = screen.getByPlaceholderText("경매 제목 입력");
    fireEvent.change(input, { target: { value: "newsearch" } });

    const submitButton = screen.getByRole("button", { name: "검색" });
    fireEvent.click(submitButton);

    expect(mockMutateAdd.mutate).toHaveBeenCalledWith("newsearch");

    expect(mockPush).toHaveBeenCalledWith("/search?keyword=newsearch");
  });

  test("관련 검색어 버튼 클릭 시 addHistoryMutation.mutate와 router.push가 호출되어야 한다", async () => {
    setMockData();

    render(<SearchBox isLoggedIn={false} />);

    const input = screen.getByPlaceholderText("경매 제목 입력");
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: "app" } });

    await waitFor(() => {
      expect(screen.getByText("apple")).toBeInTheDocument();
    });

    const appleButton = screen.getByText("apple");
    fireEvent.click(appleButton);

    expect(mockMutateAdd.mutate).toHaveBeenCalledWith("apple");

    expect(mockPush).toHaveBeenCalledWith("/search?keyword=apple");
  });

  test("useSearchHistory가 빈 배열 반환 시, '최근 검색어가 없습니다' 문구가 보여야 한다", () => {
    setEmptyMockData();

    render(<SearchBox isLoggedIn={true} />);

    fireEvent.click(screen.getByPlaceholderText("경매 제목 입력"));

    expect(screen.getByText("최근 검색어")).toBeInTheDocument();
    expect(screen.getByText("최근 검색어가 없습니다")).toBeInTheDocument();

    expect(screen.queryByText("테스트1")).toBeNull();
    expect(screen.queryByText("테스트2")).toBeNull();
  });

  test("입력값은 있으나, useRelatedWords가 빈 배열인 경우 관련 검색어 목록이 없거나 아무 것도 렌더되지 않아야 한다", async () => {
    setEmptyMockData();

    render(<SearchBox isLoggedIn={false} />);

    const input = screen.getByPlaceholderText("경매 제목 입력");
    fireEvent.click(input);

    expect(screen.getByText("최근 검색어")).toBeInTheDocument();

    expect(screen.queryByText("관련 검색어")).toBeNull();

    fireEvent.change(input, { target: { value: "app" } });

    await waitFor(() => {
      expect(screen.queryByText("apple")).toBeNull();
      expect(screen.queryByText("apricot")).toBeNull();
    });
  });

  test("최근 검색어도 없고, 관련 검색어도 없는 경우, X 버튼 클릭 후에도 빈 상태만 보여야 한다", async () => {
    setEmptyMockData();

    render(<SearchBox isLoggedIn={true} />);

    const input = screen.getByPlaceholderText("경매 제목 입력");
    fireEvent.change(input, { target: { value: "테스트" } });

    const xButton = screen.getByRole("button", { name: "현재 입력 검색어 삭제" });
    fireEvent.click(xButton);

    expect((input as HTMLInputElement).value).toBe("");
    expect(screen.getByText("최근 검색어")).toBeInTheDocument();
    expect(screen.getByText("최근 검색어가 없습니다")).toBeInTheDocument();

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: "app" } });

    await waitFor(() => {
      expect(screen.queryByText("apple")).toBeNull();
      expect(screen.queryByText("apricot")).toBeNull();
      expect(screen.queryByText("application")).toBeNull();
    });
  });
});