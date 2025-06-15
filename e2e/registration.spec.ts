import { test, expect } from "@playwright/test";
import path from "path";

test.describe("상품 등록 E2E", () => {
  test("모든 입력값을 입력하고 정상적으로 등록", async ({ context, page }) => {
    const filePath = path.resolve(__dirname, "../e2e/assets/test.png");

    await context.addCookies([
      {
        name: "accessToken", // 쿠키 이름
        value: process.env.E2E_ACCESS_TOKEN || "",
        domain: "localhost", // 서버 도메인 (포트 없이!)
        path: "/",
        httpOnly: false,
        secure: false,
        sameSite: "Lax",
      },
    ]);
    // 1. 페이지 진입
    await page.goto("http://localhost:3000/registration");

    // 2. input 직접 접근하여 파일 업로드
    await page.setInputFiles(
      'input[data-testid="image-uploader-input"]',
      filePath
    );

    // 3. 경매 제목 입력
    await page.locator("input#auction-title").fill("E2E 테스트 상품");

    // 4. 시작 가격 입력
    await page
      .getByPlaceholder("₩ 경매 시작 가격 (최대 1억 원, 100원 단위)")
      .fill("5000");

    // 5. 상세 설명 입력
    await page
      .locator("textarea#dietailed-input")
      .fill("이건 E2E 테스트용 상세 설명입니다.");

    // 6. 상품 상태 선택 (첫 번째 조건 선택)
    await page.locator('label[for="condition-0"]').first().click();

    // 7. 카테고리 3단계 선택
    await page.getByText("전자기기").click();
    await page.getByText("모바일/태블릿").click();
    await page.getByText("스마트폰").click();

    // 8. 경매 시작 시간 설정 (강제)
    await page.getByText("경매 시작 시간").click();

    await page.evaluate(() => {
      const swipers = document.querySelectorAll(".swiper");
      (swipers[0] as unknown as { swiper: any }).swiper.slideToLoop(0);
      (swipers[1] as unknown as { swiper: any }).swiper.slideToLoop(1);
    });

    await page.getByText("적용").click();

    // 9. 경매 지속 시간 설정 (강제)
    await page.getByText("경매 소요 시간 선택").click();

    await page.evaluate(() => {
      const swipers = document.querySelectorAll(".swiper");
      (swipers[0] as unknown as { swiper: any }).swiper.slideToLoop(0);
      (swipers[1] as unknown as { swiper: any }).swiper.slideToLoop(10);
    });

    await page.getByText("적용").click();
    // 10. 판매 동의 체크
    await page.getByTestId("seller-agreement-check").click();
    // 11. 등록 버튼 클릭
    await page.getByText("등록하기").nth(1).click();

    // 12. 확인 모달 > 확인 버튼 클릭
    await page.getByText("확인").click();

    // 13. 성공 메시지 확인
    await expect(
      page.locator("text=경매 물품 등록이 완료되었습니다!")
    ).toBeVisible();
  });
});
