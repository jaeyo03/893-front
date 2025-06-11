import { makeQueryString } from '@/lib/api/search';

describe('makeSearchQueryString의 반환 String 검증', () => {
  test('빈 객체를 넘기면 빈 문자열을 반환한다', () => {
    const params = {};
    const result = makeQueryString(params);
    expect(result).toBe('');
  });

  test('키워드 입력시 인코딩된 문자열을 반환한다', () => {
    const params = { keyword: '아이패드' };
    const result = makeQueryString(params);
    expect(result).toBe('?keyword=%EC%95%84%EC%9D%B4%ED%8C%A8%EB%93%9C');
  });

  test('여러 개의 키-값 쌍을 Object에 담아서 넘기면 &로 연결한다', () => {
    const params = { foo: 'bar', page: '2' };
    const result = makeQueryString(params);
    expect(result).toBe('?foo=bar&page=2');
  });

  test('값으로 빈 문자열("")을 넘기면 포함하지 않는다', () => {
    const params = { a: '' };
    const result = makeQueryString(params);
    expect(result).toBe('');
  });

  test('값으로 undefined를 넘기면 해당 키는 아예 제외된다', () => {
    const params = { foo: 'bar', skip: undefined, hello: 'world' };
    const result = makeQueryString(params);
    expect(result).toBe('?foo=bar&hello=world');
  });

  test('값으로 문자열 배열을 넘기면 같은 키가 중복해서 추가된다', () => {
    const params = { tags: ['react', 'typescript', 'react'], q: '테스트' };
    const result = makeQueryString(params);
    expect(result).toBe('?tags=react&tags=typescript&q=%ED%85%8C%EC%8A%A4%ED%8A%B8');
  });

  test('배열에 빈 문자열이나 undefined가 포함되어 있어도 유효한 값만 추가된다', () => {
    const params = { arr: ['one', '', 'three'], skip: undefined };
    const result = makeQueryString(params);
    expect(result).toBe('?arr=one&arr=three');
  });
});

describe('makeSearchQueryString 반환 String의 URLSearchParams 파싱 검증', () => {
  test('빈 객체를 넣으면 빈 문자열을 반환한다', () => {
    const params: Record<string, string | string[] | undefined> = {};
    const result = makeQueryString(params);

    expect(result).toBe('');
  });

  test('값이 undefined인 키는 무시한다', () => {
    const params = { a: '1', b: undefined, c: '3' };
    const result = makeQueryString(params);

    const parsed = new URLSearchParams(result);
    expect(parsed.get('a')).toBe('1');
    expect(parsed.get('b')).toBeNull();
    expect(parsed.get('c')).toBe('3');
    expect(Array.from(parsed.keys())).toHaveLength(2);
  });

  test('값이 빈 문자열("")인 경우 포함하지 않는다', () => {
    const params = { foo: '', bar: 'baz' };
    const result = makeQueryString(params);

    const parsed = new URLSearchParams(result);
    expect(parsed.get('foo')).toBeNull();
    expect(parsed.get('bar')).toBe('baz');
    expect(Array.from(parsed.keys())).toEqual(['bar']);
  });

  test('문자열 배열 값이 들어오면 같은 키가 여러 번 포함된다', () => {
    const params = { tags: ['red', 'green', 'blue'] };
    const result = makeQueryString(params);

    const parsed = new URLSearchParams(result);

    expect(parsed.getAll('tags')).toEqual(['red', 'green', 'blue']);
    expect(Array.from(parsed.keys())).toEqual(['tags', 'tags', 'tags']);
  });

  test('배열에 undefined나 null, 빈 문자열("")이 있으면 유효한 값만 포함한다', () => {
    const params = { 
      filters: ['one', '', undefined, 'three'] as string[]
    };
    const result = makeQueryString(params);

    const parsed = new URLSearchParams(result);
    expect(parsed.getAll('filters')).toEqual(['one', 'three']);
    expect(Array.from(parsed.keys())).toEqual(['filters', 'filters']);
  });

  test('키와 값에 특수문자가 있으면 URL 인코딩되어야 한다', () => {
    const params = { 's p': 'a & b',  키: '값 = 테스트' };
    const result = makeQueryString(params);

    const parsed = new URLSearchParams(result);
    expect(parsed.get('s p')).toBe('a & b');
    expect(parsed.get('키')).toBe('값 = 테스트');
  });

  test('여러 개의 키-값 쌍을 넣으면 & 로 구분되어 포함된다', () => {
    const params = { a: '1', b: '2', c: '3' };
    const result = makeQueryString(params);

    const parsed = new URLSearchParams(result);
    expect(parsed.get('a')).toBe('1');
    expect(parsed.get('b')).toBe('2');
    expect(parsed.get('c')).toBe('3');
    expect(Array.from(parsed.keys())).toEqual(['a', 'b', 'c']);
  });

  test('반환 값이 "?" 로 시작해야한다', () => {
    const params = { foo: 'bar' };
    const result = makeQueryString(params);

    expect(result.startsWith('?')).toBe(true);
  });

  test('키가 빈 문자열("")인 경우 해당 쌍은 무시된다', () => {
    const params = { '': 'value', valid: 'ok' , '' : 'value2'};
    const result = makeQueryString(params);

    const parsed = new URLSearchParams(result);
    expect(parsed.get('')).toBeNull(); 
    expect(parsed.get('valid')).toBe('ok');
    expect(Array.from(parsed.keys())).toEqual(['valid']);
  });
});