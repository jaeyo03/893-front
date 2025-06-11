import { calculateIncreaseRate } from "../priceUtils";

describe("calculateIncreaseRate 함수", () => {
  it("시작가보다 낙찰가가 높을 경우 양수 %를 반환한다", () => {
    expect(calculateIncreaseRate(10000, 15000)).toBe("+50%");
    expect(calculateIncreaseRate(500, 750)).toBe("+50%");
  });

  it("시작가와 낙찰가가 같을 경우 +0%를 반환한다", () => {
    expect(calculateIncreaseRate(10000, 10000)).toBe("+0%");
  });

  it("낙찰가가 더 낮을 경우 음수 %를 반환한다", () => {
    expect(calculateIncreaseRate(10000, 8000)).toBe("-20%");
    expect(calculateIncreaseRate(10000, 0)).toBe("-100%");
  });

  it("시작가가 0일 경우 0%를 반환한다 (분모 방지)", () => {
    expect(calculateIncreaseRate(0, 5000)).toBe("+0%");
  });
});
