import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const STORAGE_STATE = 'playwright/.auth/user.json';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }],
    [
      'allure-playwright',
      {
        outputFolder: 'allure/results',
        suiteTitle: true,
        detail: true,
        environmentInfo: {
          FRAMEWORK: "playwright"
        }
      }
    ]
  ],
  use: {
    baseURL: 'https://enotes.pointschool.ru/',
    bypassCSP: true,
    ignoreHTTPSErrors: true,
    trace: 'on',
    screenshot: 'on',
    video: { mode: 'retain-on-failure', size: { width: 1280, height: 720 } }
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'e2e tests logged in',
      testMatch: '**/*logged-in.spec.ts',
      dependencies: ['setup'],
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
