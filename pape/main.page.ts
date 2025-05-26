import {Page} from "@playwright/test"

export default class MainPage {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async gotoPage(): Promise<void> {
    await this.page.goto('https://demoqa.com')
  }

  async gotoCard(keyWordFromLocator: string): Promise<void> {
    await this.page.locator(`//h5[text()="${keyWordFromLocator}"]`).click()
  }
}