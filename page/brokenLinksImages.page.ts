import {BrowserContext, expect, Locator, Page} from "@playwright/test"

export default class brokenLinksImages {
  page: Page
  context: BrowserContext
  validImage: Locator
  brokenImage: Locator

  constructor(page: Page, context: BrowserContext) {
    this.page = page
    this.context = context
    this.validImage = this.page.locator('//p[text()="Valid image"]//parent::div//img[@src="/images/Toolsqa.jpg"]')
    this.brokenImage = this.page.locator('//p[text()="Valid image"]//parent::div//img[@src="/images/Toolsqa_1.jpg"]')
  }

  async verifyImageByState(imageLocator: Locator, state: 'valid' | 'broken'): Promise<void> {
    const src = await imageLocator.getAttribute('src');
    const width = await imageLocator.locator(``).getAttribute('width');

    if(state === 'valid') {
      expect(src).toBe('/images/Toolsqa.jpg');
      expect(width).toBe('347');
    }

    if(state === 'broken') {
      expect(src).toBe('/images/Toolsqa_1.jpg');
      expect(width).toBe('16');
    }
  }

  async clickAndVerifyLinkByName(linkName: 'Valid' | 'Broken'): Promise<void> {
    const newPagePromise: Promise<Page> = this.context.waitForEvent('page')
    const locatorLink: Locator = this.page.locator(`//a[text()="Click Here for ${linkName} Link"]`)
    const urlLink: string | null = await locatorLink.getAttribute('href')

    if (urlLink === null) {
      process.exit(1)
    }

    await this.page.locator(`//a[text()="Click Here for ${linkName} Link"]`).click()

    const newPage: Page = await newPagePromise

    await newPage.waitForURL(urlLink)
    await expect(newPage).toHaveURL(urlLink)
  }
}