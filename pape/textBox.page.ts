import {Locator, Page , expect} from "@playwright/test"

export default class TextBoxPage {
  page: Page
  fullNameInput: Locator
  userEmailInput: Locator
  currentAddressInput: Locator
  permanentAddressInput: Locator
  submitButton: Locator
  output: Locator
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
    this.currentAddressInput = page.locator('//textarea[@id="currentAddress"]')
    this.submitButton = page.locator('//button[@id="submit"]')
    this.output = page.locator('//div[@id="output"]')
    this.nameOutput = page.locator('//p[@id="name"]')
    this.emailOutput = page.locator('//p[@id="email"]')
    this.currentAddressOutput = page.locator('//p[@id="currentAddress"]')
    this.permanentAddressOutput = page.locator('//p[@id="permanentAddress"]')
  }

  async gotoPage() {
    await this.page.goto('https://demoqa.com/text-box')
  }

  async fillNameInput(userName: string): Promise<void> {
    await this.fullNameInput.fill(userName)
  }

  async fillUserEmailInput(userEmail: string): Promise<void> {
    await this.userEmailInput.fill(userEmail)
  }

  async fillCurrentAddressInput(currentAddress: string): Promise<void> {
    await this.currentAddressInput.fill(currentAddress)
  }

  async fillPermanentAddressInput(permanentAddress: string): Promise<void> {
    await this.permanentAddressInput.fill(permanentAddress)
  }

  async clickSubmitButton(): Promise<void> {
    await this.submitButton.click()
  }

  async isDataMatch(testValue: string,inputValue: Locator) {
    const currentValue: string | null = await inputValue.textContent()
   expect(testValue).toBe(currentValue)
  }


}