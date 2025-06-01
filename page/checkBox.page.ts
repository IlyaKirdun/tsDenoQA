import {Locator, Page , expect} from "@playwright/test"

export default class CheckBoxPage {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async clickExpandButtonFolderName(testData: string) {
    await this.page.locator(`//span[text()="${testData}"]/parent::label/preceding-sibling::button`).click()
  }

  async isExpandButtonChangedState(testData: string, state: 'toBeVisible'|'toBeHidden') {
   const expandButtonState: Locator = this.page.locator(`
   //span[text()="${testData}"]/parent::label/preceding-sibling::button
   /parent::span/parent::li[contains (@class, "node-expanded")]`)

    await expect(expandButtonState)[state]()
  }

  async clickExpandOrCollapseAllFoldersButton(actionButton: string ) {
    await this.page.locator(`//button[@aria-label="${actionButton}"]`).click()
  }

  async clickCheckboxButtonElementName(elementName: string[]) {
      await this.page.locator(`//span[text()="${elementName}"]/preceding-sibling::span[@class= "rct-checkbox"]`).click()
  }

  async isDataMatch(testData: string[]): Promise<void> {
    const currentData: string | null = await this.page.locator('//div[@id= "result"]').textContent()
    expect(`You have selected :${testData.join('')}`).toBe(currentData)
  }
}