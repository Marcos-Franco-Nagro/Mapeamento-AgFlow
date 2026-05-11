import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  timeout: parseInt(process.env.NAVIGATION_TIMEOUT ?? '30000'),
  use: {
    baseURL: process.env.BASE_URL ?? 'https://agflow.agrisk.dev',
  },
});
