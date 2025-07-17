import {BrowserContext, expect, Locator, Page} from "@playwright/test"

export default class BrokenLinksImages {
  page: Page
  context: BrowserContext
  validImage: Locator
  brokenImage: Locator

  imagesDirection = {
    valid: 'https://demoqa.com/images/Toolsqa.jpg',
    broken: 'https://demoqa.com/images/Toolsqa_1.jpg'
  }

  urlList = {
    valid: 'https://demoqa.com/',
    broken: 'http://the-internet.herokuapp.com/status_codes/500',
  }

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
        src: image.src
      }
    })

    expect(imageValues.src).toBe(this.imagesDirection[state])

    if(state === 'valid') {
      expect(imageValues.naturalHeight).toBeGreaterThanOrEqual(1)
      expect(imageValues.naturalWidth).toBeGreaterThanOrEqual(1)
    }

    if(state === 'broken') {
      expect(imageValues.naturalHeight).toBeLessThanOrEqual(0)
      expect(imageValues.naturalWidth).toBeLessThanOrEqual(0)
    }
  }

  async clickAndVerifyLinkByName(linkName: 'Valid' | 'Broken', state: 'valid' | 'broken'): Promise<void> {

    await this.page.locator(`//a[text()="Click Here for ${linkName} Link"]`).click()
    await expect(this.page).toHaveURL(this.urlList[state])
  }
}