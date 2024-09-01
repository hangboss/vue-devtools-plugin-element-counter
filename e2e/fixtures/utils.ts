import { expect, type Page } from '@playwright/test'

export const getLocatorIns = (page: Page) => {
  return {
    vueApp: page.frameLocator('iframe[name="target"]'),
    app: page.getByRole('button', { name: /App(\s1)?\sVue/ }),
    appIframe: page.getByRole('button', {
      name: 'AppIframe Vue 3.4.37 /target-',
    }),
    properties: page.locator('.element-counter-properties .data-field'),
    refreshDevtools: page
      .locator('.relative > div > div > button:nth-child(3)')
      .first(),
    appDiv: page.getByText(/<App>(\sfragment\s)?(\d+\sels){1,2}/, {
      exact: true,
    }),
    iframeAppDiv: page.getByText(/<AppIframe>(\sfragment\s)?(\d+\sels){1,2}/, {
      exact: true,
    }),
    case1Div: page.getByText(/<Case1>\d+\sels/, { exact: true }),
    case2Div: page.getByText(/<Case2>\d+\sels/, { exact: true }),
    case3Div: page.getByText(/<Case3>\d+\sels/, { exact: true }),
    case4Div: page.getByText(/<Case4>\d+\sels/, { exact: true }),
    case5Div: page.getByText(/<Case5>\d+\sels/, { exact: true }),
    case6Div: page.getByText(/<Case6>\d+\sels/, { exact: true }),
    case7Div: page.getByText(/<Case7>\d+\sels/, { exact: true }),
    caseEmptyDiv: page.getByText(/<CaseEmpty>\d+\sels/, { exact: true }),
    caseMultiRootDiv: page.getByText(/<CaseMultiRoot>(\sfragment\s)\d+\sels/, {
      exact: true,
    }),
    caseTeleportDiv: page.getByText(
      /<CaseTeleportComp>(\sfragment\s)\d+\sels/,
      {
        exact: true,
      },
    ),
  }
}

export const commonCaseCountMap = {
  case1Count: 1,
  case2Count: 8,
  case3Count: 5,
  case4Count: 7,
  case5Count: 3,
  case6Count: 7,
  case7Count: 4,
  total: 35,
}

export const runCommonCase = async (page: Page) => {
  const {
    vueApp,
    properties,
    refreshDevtools,
    case1Div,
    case2Div,
    case3Div,
    case4Div,
    case5Div,
    case6Div,
    case7Div,
  } = getLocatorIns(page)

  // Case 1: Component with single element
  await case1Div.click()
  await expect(case1Div.locator('.tag')).toHaveText(
    `${commonCaseCountMap.case1Count} els`,
  )
  await expect(properties).toHaveText(
    `elements:${commonCaseCountMap.case1Count}`,
  )

  // Case 2: Component With multiple elements
  await case2Div.click()
  await expect(case2Div.locator('.tag')).toHaveText(
    `${commonCaseCountMap.case2Count} els`,
  )
  await expect(properties).toHaveText(
    `elements:${commonCaseCountMap.case2Count}`,
  )

  // Case 3: Component with no element
  await case3Div.click()
  await expect(case3Div.locator('.tag')).toHaveText(
    `${commonCaseCountMap.case3Count} els`,
  )
  await expect(properties).toHaveText(
    `elements:${commonCaseCountMap.case3Count}`,
  )

  const case3SubComponentDiv = page.getByText(/<SubComp>\d\sels/, {
    exact: true,
  })
  if (await case3SubComponentDiv.isHidden()) {
    await case3Div.locator('.arrow.right').click()
  }

  await case3SubComponentDiv.click()
  await expect(case3SubComponentDiv.locator('.tag')).toHaveText(`3 els`)
  await expect(properties).toHaveText(`elements:3`)

  // Case 4: Component with dynamic created element
  await case4Div.click()
  await expect(case4Div.locator('.tag')).toHaveText(
    `${commonCaseCountMap.case4Count - 1} els`,
  )
  await expect(properties).toHaveText(
    `elements:${commonCaseCountMap.case4Count - 1}`,
  )
  // add 2 elements
  for (let i = 0; i < 2; i++) {
    await vueApp.locator('#case4-add-element').click()
  }
  await refreshDevtools.click()
  await expect(case4Div.locator('.tag')).toHaveText(
    `${commonCaseCountMap.case4Count + 1} els`,
  )
  await expect(properties).toHaveText(
    `elements:${commonCaseCountMap.case4Count + 1}`,
  )
  // remove 1 element
  await vueApp.locator('#case4-remove-element').click()
  await refreshDevtools.click()
  await expect(case4Div.locator('.tag')).toHaveText(
    `${commonCaseCountMap.case4Count} els`,
  )
  await expect(properties).toHaveText(
    `elements:${commonCaseCountMap.case4Count}`,
  )

  // Case 5: Component with v-if
  await case5Div.click()
  await expect(case5Div.locator('.tag')).toHaveText(
    `${commonCaseCountMap.case5Count} els`,
  )
  await expect(properties).toHaveText(
    `elements:${commonCaseCountMap.case5Count}`,
  )
  // set v-if to true
  await vueApp.locator('#case5-toggle-element').click()
  await refreshDevtools.click()
  await expect(case5Div.locator('.tag')).toHaveText(
    `${commonCaseCountMap.case5Count + 3} els`,
  )
  await expect(properties).toHaveText(
    `elements:${commonCaseCountMap.case5Count + 3}`,
  )
  // set v-if to false
  await vueApp.locator('#case5-toggle-element').click()
  await refreshDevtools.click()
  await expect(case5Div.locator('.tag')).toHaveText(
    `${commonCaseCountMap.case5Count} els`,
  )
  await expect(properties).toHaveText(
    `elements:${commonCaseCountMap.case5Count}`,
  )

  // Case 6: Component with dynamic created element not use vue
  await case6Div.click()
  await expect(case6Div.locator('.tag')).toHaveText(
    `${commonCaseCountMap.case6Count - 1} els`,
  )
  await expect(properties).toHaveText(
    `elements:${commonCaseCountMap.case6Count - 1}`,
  )
  await vueApp.locator('#case6-add-element').click()
  await case6Div.click()
  await expect(case6Div.locator('.tag')).toHaveText(
    `${commonCaseCountMap.case6Count - 1} els`,
  )
  await expect(properties).toHaveText(
    `elements:${commonCaseCountMap.case6Count}`,
  )
  await refreshDevtools.click()
  await expect(case6Div.locator('.tag')).toHaveText(
    `${commonCaseCountMap.case6Count} els`,
  )

  // Case 7: Component with slot
  await case7Div.click()
  await expect(case7Div.locator('.tag')).toHaveText(
    `${commonCaseCountMap.case7Count} els`,
  )
  await expect(properties).toHaveText(
    `elements:${commonCaseCountMap.case7Count}`,
  )
}
