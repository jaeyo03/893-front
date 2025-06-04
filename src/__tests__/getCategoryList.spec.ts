import { getCategoryList } from "@/lib/api/search";

describe('getCategoryList', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('서버가 200 응답을 주면, getCategoryList도 올바른 데이터를 리턴한다', async () => {
    const fakeResponseBody = {
      code: 200,
      message: 'success',
      data: {
        categoryList: ['아이패드', '아이패드 2', '아이패드 3'],
      },
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => fakeResponseBody,
    });

    const response = await getCategoryList();

    expect(response.code).toBe(200);
    expect(response.data).toEqual({
      categoryList: ['아이패드', '아이패드 2', '아이패드 3'],
    });
  });

  test('서버가 500 응답을 주면, getCategoryList도 올바른 데이터를 리턴한다', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ code: 500, message: '서버 에러', data: { categoryList: [] } }),
    });

    const response = await getCategoryList();

    expect(response.code).toBe(500);
    expect(response.data).toEqual(null);
  });

  test('네트워크 오류를 throw 하면 catch 블록으로 빠져 code:500 리턴', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network Error'));

    const response = await getCategoryList();

    expect(response.code).toBe(500);
    expect(response.message).toBe('Network Error');
    expect(response.data).toEqual(null);
  });
});