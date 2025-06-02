import { test, expect } from '@playwright/test';

test.describe('SearchPage E2E 테스트', () => {
  // 만약 playwright.config.ts에 server 옵션을 활성화했다면 beforeAll에서 따로 서버를 띄우지 않아도 됩니다.
  // server 옵션이 없다면, 로컬에서 npm run dev로 서버를 먼저 켜고 실행해야 합니다.

  test.beforeEach(async ({ page }) => {
    // baseURL이 설정되어 있다면 page.goto('/search')만으로 충분합니다.
    await page.goto('/search');
    // 페이지가 완전히 로드될 때까지 로딩 상태 확인(필요 시 추가)
    await page.waitForLoadState('networkidle');
  });

  test('검색 입력창이 화면에 보여야 한다', async ({ page }) => {
    // SearchInput 컴포넌트에 input 태그가 있을 테니 이를 selector로 찾아봅니다.
    // 예시: placeholder가 "검색"으로 되어 있다고 가정
    const searchInput = page.getByPlaceholder('경매 제목 입력');
    await expect(searchInput).toBeVisible();
  });

  test('검색 결과가 없을 경우 빈 상태 메시지가 보여야 한다', async ({ page }) => {
    // 예를 들어 아무 파라미터 없이 /search로 접속했을 때, 
    // 데이터베이스에 아무 데이터가 없거나 특정 파라미터로 결과가 없으면 빈 화면이 보인다고 가정
    const emptyMsg = page.getByText('검색 결과가 없습니다.');
    await expect(emptyMsg).toBeVisible();
  });

  test('검색어를 입력한 뒤 엔터를 누르면 결과 카드가 보여야 한다', async ({ page }) => {
    // 1) 검색창에 임의 키워드를 입력
    const searchInput = page.getByPlaceholder('경매 제목 입력');
    await searchInput.click();
    await searchInput.fill('아이폰');   // 예시 키워드
    await searchInput.press('Enter');

    // 2) 네트워크 요청을 기다리거나, 결과가 표시될 때까지 기다립니다.
    //    예시: AuctionCard가 렌더링될 때, data-testid 등을 부여했다면 더 정확히 찾을 수 있습니다.
    //    여기는 간단히 "남은 입찰 시간" 같은 텍스트가 화면에 나타나는지 체크
    await page.waitForSelector('text=현재 입찰가'); 
    // (예시로 AuctionCard 내부에 "총 입찰" 같은 텍스트가 있다고 가정)

    // 3) 최소 1개 이상의 카드를 찾는지 검증
    const cards = page.locator('.auction-card'); 
    // (AuctionCard 컴포넌트 최상위에 `className="auction-card"`를 지정했다고 가정)
    await expect(cards).toHaveCount(12);
  });

  test('필터 UI가 정상적으로 동작하는지 확인', async ({ page }) => {
    // 1) 카테고리 필터가 보이는지
    const categoryFilterTitle = page.getByText('검색 필터');
    await expect(categoryFilterTitle).toBeVisible();

    // 2) 가격 필터가 보이는지
    const priceFilter = page.getByText('경매 시작가');
    await expect(priceFilter).toBeVisible();
  });

  test('검색 결과 페이지네이션이 정상적으로 렌더링되는지 확인', async ({ page }) => {
    // 1) 임의 검색어로 결과를 가져와서 페이지네이션 버튼이 있는지 확인
    const searchInput = page.getByPlaceholder('경매 제목 입력');
    await searchInput.fill('아이패드');
    await searchInput.press('Enter');
    await page.waitForSelector('text=페이지');

    // 2) 현재 페이지 숫자 표시가 있는지
    const currentPage = page.getByRole('button', { name: '1' });
    await expect(currentPage).toBeVisible();

    // 3) 다음 페이지 버튼 클릭 후 URL이 .../search?page=2로 바뀌는지
    const nextPageButton = page.getByRole('button', { name: '다음' }); 
    await expect(nextPageButton).toBeVisible();
    await nextPageButton.click();
    await expect(page).toHaveURL(/\/search\?page=2$/);
  });
});