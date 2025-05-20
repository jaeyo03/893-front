import {BaseResponse, SearchListResponse} from "@/types/response.types";

function makeSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): string {
  const urlSearchParams = new URLSearchParams();
  
  // searchParams을 순회하며 URLSearchParams에 추가
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // 배열인 경우 각 항목을 같은 키로 추가
      value.forEach((item) => {
        if (item) urlSearchParams.append(key, item);
      });
    } else if (value !== undefined) {
      // 단일 값인 경우 추가
      urlSearchParams.append(key, value);
    }
  });
  console.log(urlSearchParams.toString());
  return urlSearchParams.toString();
}

export async function getSearchProducts(
  searchParams: Record<string, string | string[] | undefined>,
  cookieHeader: string
): Promise<BaseResponse<SearchListResponse>> {
  let queryString = makeSearchParams(searchParams);
  
  if (queryString.length > 0) {
    queryString = `?${queryString}`;
  }
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auctions/search${queryString}`,
      {
        cache: "no-store",
        headers: {
          Cookie: cookieHeader,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      data: {
        totalAuctionsCount: 0,
        auctionList: [],
      },
      message: "Failed to fetch products",
      code: 500,
    };
  }
}

export async function getRelatedWords(
  searchParams: Record<string, string | string[] | undefined>,
  cookieHeader: string
): Promise<BaseResponse<string[]>> {
  let keyword = "";
  
  if (searchParams.keyword) {
    keyword = searchParams.keyword as string;
  } else {
    return {
      data: [],
      message: "검색어가 없습니다.",
      code: 400,
    };
  }
  
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/search/suggestions?keyword=${encodedKeyword}`,
      {
        cache: "no-store",
        headers: {
          Cookie: cookieHeader,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch related woSSrds");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching related words:", error);
    return {
      data: [],
      message: "Failed to fetch related words",
      code: 500,
    };
  }
}
