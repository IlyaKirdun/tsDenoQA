import {Page} from "@playwright/test"

export default class NavigationBar {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

async gotoNavBar(parentName: string, elementName: string): Promise<void> {
    await this.page.locator(`
    //div[text()= "${parentName}"]/ancestor::div[2]
    //span[text()= "${elementName}"]`).click()
  }
}