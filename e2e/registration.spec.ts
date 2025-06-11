import { test, expect } from "@playwright/test";
import path from "path";

test.describe("상품 등록 E2E", () => {
  test("모든 입력값을 입력하고 정상적으로 등록", async ({ page }) => {
    const filePath = path.resolve(__dirname, "../e2e/assets/test.png");

    // 1. 페이지 이동
    await page.goto("http://localhost:3000/registration");

    // 2. 숨겨진 input[type=file]에 직접 파일 설정
    await page.setInputFiles("input#image-upload", filePath);

    // 3. 제목 입력
    await page.getByTestId("title-input").fill("E2E 테스트 상품");

    // 4. 시작 가격
    await page.getByTestId("payment-input").fill("5000");

    // 5. 상세 설명
    await page.getByTestId("detail-input").fill("이건 테스트용 설명입니다");

    // 6. 상품 상태 선택 (예: 'used')
    await page.getByTestId("product-status-used").click();

    // 7. 카테고리 선택
    await page.getByTestId("category-main").click();
    await page.getByText("전자기기").click(); // 실제 옵션 이름에 맞게 수정

    // 8. 경매 시작 시간
    await page.getByTestId("auction-start-time").click();
    await page.getByText("바로 시작").click(); // 옵션에 맞게 수정

    // 9. 경매 지속 시간
    await page.getByTestId("auction-duration").click();
    await page.getByText("1시간").click(); // 옵션에 맞게 수정

    // 10. 판매 동의 체크
    await page.getByTestId("seller-agreement-checkbox").click();

    // 11. 등록 버튼 → 확인 모달 → 확인 클릭
    await page.getByTestId("sell-button").click();
    await page.getByTestId("confirm-button").click();

    // 12. 성공 메시지 확인
    await expect(
      page.locator("text=경매 물품 등록이 완료되었습니다!")
    ).toBeVisible();
  });
});
