import { test, expect } from '@playwright/test'
import {
  getLocatorIns,
  commonCaseCountMap,
  runCommonCase,
} from './fixtures/utils'

test('Vue2 base test', async ({ page }) => {
  await page.goto('http://localhost:3001/')
  const locatorIns = getLocatorIns(page)
  await runCommonCase(page)

  // Test: Component with no element
  const CaseEmptyCount = 1
  await locatorIns.caseEmptyDiv.click()
  await expect(locatorIns.caseEmptyDiv.locator('.tag')).toHaveText(
    `${CaseEmptyCount} els`,
  )
  await expect(locatorIns.properties).toHaveText(`elements:${CaseEmptyCount}`)

  // Test: App component
  const appCount = commonCaseCountMap.total + CaseEmptyCount + 1
  await locatorIns.appDiv.click()
  await expect(locatorIns.appDiv.locator('.tag').first()).toHaveText(
    `${appCount} els`,
  )
  await expect(locatorIns.properties).toHaveText(`elements:${appCount}`)
  await expect(locatorIns.appDiv.locator('.tag').nth(0)).toBeVisible()
})
