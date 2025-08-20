import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 4 : 4,
  reporter: [
    [
      'playwright-qase-reporter',
      {
        testops: {
          api: {
            token: process.env.QASE_TESTOPS_API_TOKEN,
          },
          project: process.env.QASE_TESTOPS_PROJECT,
        },
      },
    ],
  ],

  use: {
    headless: false,
    baseURL: 'https://demoqa.com/',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
      },
    },
  ],
});
