import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:54587',
    headless: true,
    ignoreHTTPSErrors: true,
  },
  retries: 0,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
});