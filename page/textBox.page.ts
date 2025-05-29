import {Locator, Page , expect} from "@playwright/test"

export default class TextBoxPage {
  page: Page
  fullNameInput: Locator
  userEmailInput: Locator
  currentAddressInput: Locator
  permanentAddressInput: Locator
  submitButton: Locator
  nameOutput: Locator
  emailOutput: Locator
  currentAddressOutput: Locator
  permanentAddressOutput: Locator

  constructor(page: Page) {
    this.page = page
    this.fullNameInput = page.locator('//input[@id="userName"]')
    this.userEmailInput = page.locator('//input[@id="userEmail"]')
    this.currentAddressInput = page.locator('//textarea[@id="currentAddress"]')
    this.permanentAddressInput = page.locator('//textarea[@id="permanentAddress"]')
    this.submitButton = page.locator('//button[@id="submit"]')
    this.nameOutput = page.locator('//p[@id="name"]')
    this.emailOutput = page.locator('//p[@id="email"]')
    this.currentAddressOutput = page.locator('//p[@id="currentAddress"]')
    this.permanentAddressOutput = page.locator('//p[@id="permanentAddress"]')
  }

  async fillInputByName(testData:any, inputName: Locator): Promise<void> {
    await inputName.fill(testData)
  }

  async clickSubmitButton(): Promise<void> {
    await this.submitButton.click()
  }

  async isDataMatch(testData:any,inputData: Locator): Promise<void> {
    const currentData: string | null = await inputData.textContent()
   expect(testData).toBe(currentData)
  }
}