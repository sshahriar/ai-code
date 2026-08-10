import { test, expect } from '@playwright/test';

test.describe('FinAlly AI Trading Workstation E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto('/');
    // Wait for the app header to be visible
    await expect(page.locator('header')).toBeVisible({ timeout: 15000 });
  });

  test('Fresh Launch - 10 default tickers, $10,000 cash balance, green connection status', async ({ page }) => {
    // 1. Connection status dot should be green and text should say LIVE STREAM
    const statusDot = page.locator('[data-testid="connection-status-dot"]');
    const statusText = page.locator('[data-testid="connection-status-text"]');

    await expect(statusDot).toBeVisible();
    await expect(statusDot).toHaveClass(/bg-emerald-500/);
    await expect(statusText).toHaveText('LIVE STREAM');

    // 2. Check Available Cash in header ($10,000.00)
    const availableCashText = page.locator('header').getByText('Available Cash');
    await expect(availableCashText).toBeVisible();
    
    const cashValue = page.locator('header').getByText('$10,000.00');
    await expect(cashValue).toBeVisible();

    // 3. Check Watchlist displays 10 default tickers
    const defaultTickers = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NVDA', 'META', 'JPM', 'V', 'NFLX'];
    for (const ticker of defaultTickers) {
      await expect(page.locator('div').filter({ hasText: new RegExp(`^${ticker}$`) }).first()).toBeVisible();
    }
  });

  test('Watchlist Management - Add and remove ticker (AMD)', async ({ page }) => {
    const addInput = page.locator('input[placeholder="ADD TICKER (e.g. NVDA)"]');
    const addButton = page.locator('button', { hasText: 'ADD' });

    // 1. Add AMD to Watchlist
    await addInput.fill('AMD');
    await addButton.click();

    // Verify AMD appears in watchlist
    const amdTickerItem = page.locator('div').filter({ hasText: /^AMD$/ }).first();
    await expect(amdTickerItem).toBeVisible({ timeout: 5000 });

    // 2. Remove AMD from Watchlist
    const removeBtn = page.locator('button[title="Remove AMD"], button[aria-label="Remove AMD"]');
    await expect(removeBtn).toBeAttached();
    await removeBtn.click({ force: true });

    // Verify AMD is removed from watchlist
    await expect(amdTickerItem).not.toBeVisible({ timeout: 5000 });
  });

  test('Manual Trading - Execute Buy and Sell order flow', async ({ page }) => {
    const tickerInput = page.locator('input[placeholder="TICKER"]');
    const qtyInput = page.locator('input[placeholder="QTY"]');
    const buyButton = page.locator('button', { hasText: 'INSTANT BUY' });
    const sellButton = page.locator('button', { hasText: 'INSTANT SELL' });

    // 1. Execute Buy Order of 5 AAPL
    await tickerInput.fill('AAPL');
    await qtyInput.fill('5');
    await buyButton.click();

    // Verify success notification toast in Market Order Bar
    const buySuccessMessage = page.locator('text=Successfully executed BUY for 5 shares of AAPL');
    await expect(buySuccessMessage).toBeVisible({ timeout: 5000 });

    // Verify cash balance decreased (no longer $10,000.00)
    const initialCash = page.locator('header').getByText('$10,000.00');
    await expect(initialCash).not.toBeVisible();

    // Verify position appears in Active Holdings table
    const activeHoldingsTable = page.locator('table');
    await expect(activeHoldingsTable).toBeVisible();
    const aaplRow = activeHoldingsTable.locator('tr', { hasText: 'AAPL' });
    await expect(aaplRow).toBeVisible();
    await expect(aaplRow).toContainText('5');

    // 2. Execute Sell Order of 5 AAPL
    await tickerInput.fill('AAPL');
    await qtyInput.fill('5');
    await sellButton.click();

    // Verify sell success notification
    const sellSuccessMessage = page.locator('text=Successfully executed SELL for 5 shares of AAPL');
    await expect(sellSuccessMessage).toBeVisible({ timeout: 5000 });

    // Verify position is removed or updated in Active Holdings table
    await expect(aaplRow).not.toBeVisible({ timeout: 5000 });
  });

  test('Portfolio Visualizations - Heatmap treemap and P&L history chart render correctly', async ({ page }) => {
    // 1. Check Portfolio Heatmap header
    const heatmapHeader = page.getByRole('heading', { name: 'Portfolio Heatmap' });
    await expect(heatmapHeader).toBeVisible();

    // Buy a share to populate Heatmap with a tile
    const tickerInput = page.locator('input[placeholder="TICKER"]');
    const qtyInput = page.locator('input[placeholder="QTY"]');
    const buyButton = page.locator('button', { hasText: 'INSTANT BUY' });
    await tickerInput.fill('AAPL');
    await qtyInput.fill('2');
    await buyButton.click();

    // Heatmap should render AAPL tile
    const heatmapSection = page.locator('div').filter({ hasText: 'Portfolio Heatmap' }).first().locator('..');
    const aaplTile = heatmapSection.locator('text=AAPL');
    await expect(aaplTile).toBeVisible();

    // 2. Check Portfolio P&L History Chart
    const pnlHeader = page.getByRole('heading', { name: 'Portfolio P&L History' });
    await expect(pnlHeader).toBeVisible();

    // Verify SVG chart elements inside P&L container
    const pnlSvg = page.locator('svg').filter({ has: page.locator('defs #pnl-area-gradient') });
    await expect(pnlSvg).toBeVisible();
  });

  test('AI Chat Assistant (LLM_MOCK=true) - Send prompt & verify inline trade execution card', async ({ page }) => {
    // Ensure AI Chat panel is expanded
    const openCopilotBtn = page.locator('button', { hasText: 'AI COPILOT' });
    if (await openCopilotBtn.isVisible()) {
      await openCopilotBtn.click();
    }

    const chatInput = page.locator('input[placeholder="Ask AI or execute command..."]');
    const sendButton = page.locator('button[title="Send Message"]');

    await expect(chatInput).toBeVisible();

    // Send chat prompt to execute trade
    await chatInput.fill('Buy 5 shares of MSFT');
    await sendButton.click();

    // Verify assistant response message and inline confirmation card appear in chat
    const actionCard = page.locator('text=/EXECUTED buy: 5 MSFT/i');
    await expect(actionCard).toBeVisible({ timeout: 10000 });

    const filledBadge = page.locator('span', { hasText: 'FILLED' });
    await expect(filledBadge).toBeVisible();

    // Verify MSFT position updated in Active Holdings table
    const activeHoldingsTable = page.locator('table');
    const msftRow = activeHoldingsTable.locator('tr', { hasText: 'MSFT' });
    await expect(msftRow).toBeVisible();
    await expect(msftRow).toContainText('5');
  });

  test('SSE Resilience - Verification of live stream status dot badge', async ({ page }) => {
    const statusDot = page.locator('[data-testid="connection-status-dot"]');
    const statusText = page.locator('[data-testid="connection-status-text"]');

    await expect(statusDot).toBeVisible();
    await expect(statusDot).toHaveClass(/bg-emerald-500/);
    await expect(statusText).toHaveText('LIVE STREAM');

    // Wait a brief moment to ensure SSE prices remain connected and active
    await page.waitForTimeout(2000);
    await expect(statusDot).toHaveClass(/bg-emerald-500/);
  });
});
