import { test, expect } from "@playwright/test";
import path from "path";
import type { Swiper } from "swiper";

test.describe("상품 수정 E2E", () => {
  test("기존 값을 불러오고 일부 수정 후 정상적으로 저장", async ({
    context,
    page,
  }) => {
    const filePath = path.resolve(__dirname, "../e2e/assets/test2.jpg");
    const auctionId = 1; // 실제 존재하는 경매 ID로 교체

    // 로그인 쿠키 설정
    await context.addCookies([
      {
        name: "accessToken",
        value: process.env.E2E_ACCESS_TOKEN || "",
        domain: "localhost",
        path: "/",
        httpOnly: false,
        secure: false,
        sameSite: "Lax",
      },
    ]);

    // 페이지 이동
    await page.goto(`http://localhost:3000/edit/${auctionId}`);

    // 이미지 1장 추가 업로드
    await page.setInputFiles(
      'input[data-testid="image-uploader-input"]',
      filePath
    );

    // 제목 수정
    const titleInput = page.locator("input#auction-title");
    await titleInput.fill("");
    await titleInput.fill("E2E 수정된 제목");

    // 상세 설명 수정
    const detailInput = page.locator("textarea#dietailed-input");
    await detailInput.fill("");
    await detailInput.fill("이건 E2E 테스트용 수정된 설명입니다.");

    // 경매 시작 시간 수정
    await page.getByText("경매 시작 시간").click();
    await page.evaluate(() => {
      const swipers = document.querySelectorAll(".swiper");
      (swipers[0] as HTMLElement & { swiper: Swiper }).swiper.slideToLoop(0);
      (swipers[1] as HTMLElement & { swiper: Swiper }).swiper.slideToLoop(2);
    });
    await page.getByText("적용").click();

    // 경매 소요 시간 수정
    await page.getByText("경매 소요 시간 선택").click();
    await page.evaluate(() => {
      const swipers = document.querySelectorAll(".swiper");
      (swipers[0] as HTMLElement & { swiper: Swiper }).swiper.slideToLoop(0);
      (swipers[1] as HTMLElement & { swiper: Swiper }).swiper.slideToLoop(15);
    });
    await page.getByText("적용").click();

    // 판매 동의 체크
    await page.getByTestId("seller-agreement-check").click();

    // 수정 버튼 클릭
    await page.getByRole("button", { name: "수정하기" }).click();

    // 확인 모달 > 확인 버튼 클릭
    await page.getByText("확인").click();

    // 성공 메시지 확인
    await expect(
      page.locator("text=경매 수정이 완료되었습니다!")
    ).toBeVisible();
  });
});
