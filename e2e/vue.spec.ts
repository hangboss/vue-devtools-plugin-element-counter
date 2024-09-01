import { test, expect } from '@playwright/test'
import path from 'path'
import { fileURLToPath } from 'url'

import {
  getLocatorIns,
  commonCaseCountMap,
  runCommonCase,
} from './fixtures/utils'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/')
})

test('Vue3 base test', async ({ page }) => {
  const locatorIns = getLocatorIns(page)
  await locatorIns.app.click()
  await runCommonCase(page)

  // Test: Component with no element
  const caseEmptyCount = 0
  await locatorIns.caseEmptyDiv.click()
  await expect(locatorIns.caseEmptyDiv.locator('.tag')).toHaveText(
    `${caseEmptyCount} els`,
  )
  await expect(locatorIns.properties).toHaveText(`elements:${caseEmptyCount}`)

  // Test: Multiple Root Component
  const caseMultiRootCount = 4
  await locatorIns.caseMultiRootDiv.click()
  await expect(locatorIns.caseMultiRootDiv.locator('.tag')).toHaveText(
    `${caseMultiRootCount} els`,
  )
  await expect(locatorIns.properties).toHaveText(
    `elements:${caseMultiRootCount}`,
  )

  // Test: Teleport Component
  const caseTeleportCount = 1
  await locatorIns.caseTeleportDiv.click()
  await expect(locatorIns.caseTeleportDiv.locator('.tag')).toHaveText(
    `${caseTeleportCount} els`,
  )
  await expect(locatorIns.properties).toHaveText(
    `elements:${caseTeleportCount}`,
  )

  // Test: App Component
  const appCount =
    commonCaseCountMap.total +
    caseEmptyCount +
    caseMultiRootCount +
    caseTeleportCount
  await locatorIns.appDiv.click()
  await expect(locatorIns.appDiv.locator('.tag').first()).toHaveText(
    `${appCount} els`,
  )
  await expect(locatorIns.properties).toHaveText(`elements:${appCount}`)
  await expect(locatorIns.appDiv.locator('.tag').nth(1)).toBeVisible()
})

test('Vue3 iframe test', async ({ page }) => {
  const locatorIns = getLocatorIns(page)
  await locatorIns.appIframe.click()
  await page.waitForTimeout(300)

  await locatorIns.case1Div.click()
  await expect(locatorIns.case1Div.locator('.tag')).toHaveText(
    `${commonCaseCountMap.case1Count} els`,
  )
  await expect(locatorIns.properties).toHaveText(
    `elements:${commonCaseCountMap.case1Count}`,
  )

  const appCount = 4
  await locatorIns.iframeAppDiv.click()
  await expect(locatorIns.iframeAppDiv.locator('.tag').first()).toHaveText(
    `${appCount} els`,
  )
  await expect(locatorIns.properties).toHaveText(`elements:${appCount}`)
})

const warningSettings = path.join(__dirname, 'fixtures/settings/warning.json')
const defaultSettings = path.join(__dirname, 'fixtures/settings/default.json')

test.describe('Tests for settings with no warning', () => {
  test.use({ storageState: defaultSettings })
  test('Vue3 with default settings', async ({ page }) => {
    const locatorIns = getLocatorIns(page)
    await locatorIns.app.click()
    await expect(
      locatorIns.case2Div.locator(
        '.info.tag.rounded-sm.v-popper--has-tooltip ',
      ),
    ).toBeHidden()
    await expect(
      locatorIns.appDiv.locator('.info.tag.rounded-sm.v-popper--has-tooltip '),
    ).toBeHidden()
  })
})

test.describe('Tests for settings with warning', () => {
  test.use({ storageState: warningSettings })
  test('Vue3 with warning for too many elements', async ({ page }) => {
    const locatorIns = getLocatorIns(page)
    await locatorIns.app.click()
    await expect(
      locatorIns.case2Div.locator(
        '.info.tag.rounded-sm.v-popper--has-tooltip ',
      ),
    ).toBeVisible()
    await expect(
      locatorIns.appDiv
        .locator('.info.tag.rounded-sm.v-popper--has-tooltip ')
        .first(),
    ).toBeVisible()
  })
})
