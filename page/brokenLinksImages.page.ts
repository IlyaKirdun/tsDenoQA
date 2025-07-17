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
    const imageValues = await imageLocator.evaluate((image: HTMLImageElement) => {
      return {
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        src: image.src,
      }
    })

    expect(imageValues.src).toBe(imageLocator.getAttribute('src'))

    if(state === 'valid') {
      expect(imageValues.naturalHeight).toBeGreaterThanOrEqual(1)
      expect(imageValues.naturalWidth).toBeGreaterThanOrEqual(1)
    }

    if(state === 'broken') {
      expect(imageValues.naturalHeight).toBeLessThanOrEqual(0)
      expect(imageValues.naturalWidth).toBeLessThanOrEqual(0)
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