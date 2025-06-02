import { getSearchProducts } from '@/lib/api/search';

describe('getSearchProducts (fetch mock 처리)', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('서버가 200 응답을 주면, getSearchProducts도 올바른 데이터를 리턴한다', async () => {
    const fakeResponseBody = {
      code: 200,
      message: 'success',
      data: {
        auctionList: [{ id: 1, title: 'Test Auction' }],
      },
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => fakeResponseBody,
    });

    const params = { keyword: '아이패드' };
    const response = await getSearchProducts(params);

    expect(response.code).toBe(200);
    expect(response.data.auctionList).toHaveLength(1);
    expect(response.data.auctionList[0].title).toBe('Test Auction');
  });

  test('서버가 500 (혹은 ok:false) 응답을 주면 catch 블록으로 빠져 code:500 리턴', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ code: 500, message: '서버 에러', data: { auctionList: [] } }),
    });

    const response = await getSearchProducts({ keyword: '아이패드' });
    expect(response.code).toBe(500);
    expect(response.data.auctionList).toEqual([]);
  });

  test('네트워크 오류를 throw 하면 catch 블록으로 빠져 code:500 리턴', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network Error'));

    const response = await getSearchProducts({ keyword: '아이패드' });
    expect(response.code).toBe(500);
    expect(response.message).toBe('Network Error');
    expect(response.data.auctionList).toEqual([]);
  });
});