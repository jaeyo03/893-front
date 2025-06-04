import { getRelatedWords } from "@/lib/api/search";

describe('getRelatedWords', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('서버가 200 응답을 주면, getRelatedWords도 올바른 데이터를 리턴한다', async () => {
    const fakeResponseBody = {
      code: 200,
      message: 'success',
      data: {
        relatedWords: ['아이패드', '아이패드 2', '아이패드 3'],
      },
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => fakeResponseBody,
    });

    const params = { keyword: '아이패드' };
    const response = await getRelatedWords(params);

    expect(response.code).toBe(200);
    expect(response.data).toEqual({
      relatedWords: ['아이패드', '아이패드 2', '아이패드 3'],
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/api/search/suggestions?keyword=%EC%95%84%EC%9D%B4%ED%8C%A8%EB%93%9C`,
      {
        cache: 'no-store',
      }
    );
  });

  test('서버가 500 응답을 주면, getRelatedWords도 올바른 데이터를 리턴한다', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ code: 500, message: '서버 에러', data: { relatedWords: [] } }),
    });

    const params = { keyword: '아이패드' };
    const response = await getRelatedWords(params);

    expect(response.code).toBe(500);
    expect(response.message).toBe('Failed to fetch related words');
    expect(response.data).toEqual([]);
  });

  test('네트워크 오류를 throw 하면 catch 블록으로 빠져 code:500 리턴', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network Error'));

    const params = { keyword: '아이패드' };
    const response = await getRelatedWords(params);

    expect(response.code).toBe(500);
    expect(response.message).toBe('Network Error');
    expect(response.data).toEqual([]);
  });
});