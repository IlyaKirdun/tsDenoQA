import {Page , expect} from "@playwright/test"

export default class CheckBoxPage {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async clickOnRadioButton(buttonName: {}) {
    await this.page.locator(`//input[@id= "${buttonName}"]`).click({ force: true })
  }

  async checkIsDataMatch(buttonName: {}) {
    const currentData: string | null = await this.page.locator('//p[contains(text(), "You have selected")]').textContent()
    expect(`You have selected ${buttonName}`).toBe(currentData)
  }

  async checkForInactiveButton(buttonName: {}) {
    await expect(this.page.locator(`//input[@id= "${buttonName}"]`)).toBeDisabled()
  }
}