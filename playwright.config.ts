import { defineConfig, devices } from '@playwright/experimental-ct-vue2'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: './__snapshots__',
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch:
        process.env.CUSTOM_VUE_VERSION === '2' ? 'vue2.spec.ts' : 'vue.spec.ts',
    },
  ],

  webServer: [
    {
      command: 'pnpm dev-shell',
      port: 50709,
      timeout: 120 * 1000,
      stdout: 'ignore',
      stderr: 'pipe',
      reuseExistingServer: !process.env.CI,
    },
    process.env.CUSTOM_VUE_VERSION === '2'
      ? {
          command: 'pnpm dev-ui:2',
          port: 3001,
          timeout: 120 * 1000,
          stdout: 'ignore',
          stderr: 'pipe',
          reuseExistingServer: !process.env.CI,
        }
      : {
          command: 'npm run dev-ui:3',
          port: 3000,
          timeout: 120 * 1000,
          stdout: 'ignore',
          stderr: 'pipe',
          reuseExistingServer: !process.env.CI,
        },
  ],
})
