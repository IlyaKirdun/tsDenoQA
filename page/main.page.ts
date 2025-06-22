import {Page} from "@playwright/test"
import {ElementsOnMainPage} from "../utils/types";

export default class MainPage {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async navigateToMainPage(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' })
  }

  async clickOnElement(elementName: ElementsOnMainPage): Promise<void> {
    await this.page.locator(`//h5[text()="${elementName}"]`).click()
  }
}