import { makeKeywordQueryString } from "@/lib/api/search";

describe('makeKeywordQueryString', () => {
  test('keyword가 없으면 빈 문자열을 반환한다', () => {
    const params = { keyword: '' };
    const result = makeKeywordQueryString(params);
    expect(result).toBe('');
  });

  test('keyword가 있으면 인코딩된 문자열을 반환한다', () => {
    const params = { keyword: '아이패드', page: '1' };
    const result = makeKeywordQueryString(params);
    expect(result).toBe('?keyword=%EC%95%84%EC%9D%B4%ED%8C%A8%EB%93%9C');
  });

  test('keyword만 반환한다', () => {
    const params = { page: '1' };
    const result = makeKeywordQueryString(params);
    expect(result).toBe('');
  });
});