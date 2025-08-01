import {Page} from "@playwright/test"
import {ElementsOnMainPage} from "../utils/types";

export default class MainPage {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async navigateToMainPage(): Promise<Page> {
    let attempts = 5
    while (attempts-- > 0) {
      const response = await this.page.goto('/', { waitUntil: 'domcontentloaded' })

      if ((response != null) && ![500, 502].includes(response.status())) {
        return this.page
      }

      // Открываем новую страницу в том же контексте
      const newPage = await this.page.context().newPage()
      const newResponse = await newPage.goto('https://demoqa.com', { waitUntil: 'domcontentloaded' })

      if ((newResponse != null) && ![500, 502].includes(newResponse.status())) {
        await this.page.close()
        this.page = newPage
        return this.page
      }

      await newPage.close()
    }

    throw new Error('❌ Failed to load the page after 5 attempts.')
  }

  async clickOnElement(elementName: ElementsOnMainPage): Promise<void> {
    await this.page.locator(`//h5[text()="${elementName}"]`).click()
  }
}