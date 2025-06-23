// e2e/home.spec.ts
import { test, expect } from "@playwright/test";

test.describe("HomePage E2E 전체 흐름", () => {
  test.beforeEach(async ({ page }) => {
    // 'load' 이벤트 대기만으로 충분
    await page.goto("/", { waitUntil: "load" });
  });

  // 1. 대시보드 통계 렌더링
  test("대시보드 통계 카드들이 렌더링되어야 한다", async ({ page }) => {
    const stats = page.getByTestId("dashboard-stats");
    await expect(stats).toBeVisible();
    await expect(stats.locator("div.border")).toHaveCount(3);
  });

  // 2. 최근 등록 리스트 클릭 시 상세 페이지 이동
  test("최근 등록 리스트 카드 클릭 시 상세 페이지로 이동해야 한다", async ({
    page,
  }) => {
    const list = page.getByTestId("recent-auction-list");
    await expect(list).toBeVisible();

    // <a> 엘리먼트 클릭
    const cardLink = list.locator("a").first();
    await expect(cardLink).toBeVisible();
    await cardLink.click();
    // router.push가 아닌 Link 컴포넌트를 썼다면, href로도 검증 가능하지만
    await expect(page).toHaveURL(/\/detail\/\d+/);
  });

  // 3. 실시간 랭킹 탭 전환 & 상세 이동
  test("실시간 랭킹 탭 전환 후 아이템 클릭 시 상세 페이지로 이동해야 한다", async ({
    page,
  }) => {
    const panel = page.getByTestId("real-time-ranking");
    await expect(panel).toBeVisible();

    const upcomingTab = panel.getByRole("button", { name: "경매예정" });
    await upcomingTab.click();
    await expect(upcomingTab).toHaveClass(/bg-black/);

    const item = panel.locator("div.cursor-pointer").first();
    await expect(item).toBeVisible();
    await item.click();
    await expect(page).toHaveURL(/\/detail\/\d+/);
  });

  // 4. 경매 임박 물품 '지금 참여하기' 버튼 클릭
  test('경매 임박 물품에서 "지금 참여하기" 클릭 시 상세 페이지로 이동해야 한다', async ({
    page,
  }) => {
    const section = page.getByTestId("auction-soon-list");
    await expect(section).toBeVisible();

    // 중복된 버튼 중 첫 번째만
    const participateBtn = section
      .getByRole("button", { name: "지금 참여하기" })
      .first();
    await expect(participateBtn).toBeVisible();
    await participateBtn.click();
    await expect(page).toHaveURL(/\/detail\/\d+/);
  });

  // 5. 최근 7일 최고 낙찰가 TOP5 클릭 시 상세 이동
  test("최근 7일 최고 낙찰가 TOP5 카드 클릭 시 상세 페이지로 이동해야 한다", async ({
    page,
  }) => {
    const wrapper = page.getByTestId("top-bid-card-list");
    await expect(wrapper).toBeVisible();

    const card = wrapper.locator("div.cursor-pointer").first();
    await expect(card).toBeVisible();
    await card.click();
    await expect(page).toHaveURL(/\/detail\/\d+/);
  });

  // 6. 카테고리별 베스트 TOP3: 탭 전환, 스크롤, 카드 클릭
  test("카테고리별 섹션: 탭 전환, 좌우 스크롤, 카드 클릭 시 상세 이동", async ({
    page,
  }) => {
    const section = page.getByTestId("best-by-category");
    await expect(section).toBeVisible();

    const tabs = section.getByRole("tab");
    const secondTab = tabs.nth(1);

    await secondTab.click();
    await expect(secondTab).toHaveAttribute("aria-selected", "true");

    await section.getByLabel("왼쪽 스크롤").click();
    await section.getByLabel("오른쪽 스크롤").click();

    const card = section.locator("div.grid > div.cursor-pointer").first();
    await expect(card).toBeVisible();
    await card.click();
    await expect(page).toHaveURL(/\/detail\/\d+/);
  });
});
