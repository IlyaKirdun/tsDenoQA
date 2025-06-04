import {expect, Locator, Page} from "@playwright/test"

export default class RegistrationModalWindow {
  page: Page
  closeModalWindowButton: Locator
  modalWindow: Locator
  submitButtonInModalWindow: Locator

  constructor(page: Page) {
    this.page = page
    this.modalWindow = this.page.locator('//div[@class="modal-header"]')
    this.closeModalWindowButton = this.page.locator('//div[@role= "dialog"]//button[@class= "close"]')
    this.submitButtonInModalWindow = this.page.locator('//div[@class= "modal-body"]//button[@id= "submit"]')
  }

  async isModalWindowToBeVisible(): Promise<void> {
    await expect(this.modalWindow).toBeVisible()
  }

  async isModalWindowToBeHidden(): Promise<void> {
    await expect(this.modalWindow).toBeHidden()
  }

  async clickCloseModalWindowButton(): Promise<void> {
    await this.closeModalWindowButton.click()
  }

  async fillInputInModalWindow(inputName: string, testUserData: string): Promise<void> {
    await this.page.locator(`//div[@class= "modal-body"]
    //input[@placeholder= "${inputName}"]`).fill(`${testUserData}`)
  }

  async isInputDataCorrectInModalWindow(inputName: string, testUserData: string): Promise<void> {
    const currentData: string | null = await this.page.locator(`
    //div[@class= "modal-body"]//input[@placeholder= "${inputName}"]`).getAttribute('value')
    expect(testUserData).toBe(currentData)
  }

  async validationInputColorInModalWindow(inputName: string, state: string): Promise<void> {
    const stateValid: { [key: string]: string} = {
      validColor: 'rgb(40, 167, 69)',
      invalidColor: 'rgb(220, 53, 69)'
    }
    let stateInput: Locator = this.page.locator(`//div[@class= "modal-body"]//input[@placeholder= "${inputName}"]`)
    const backgroundColor = await stateInput.evaluate(el => getComputedStyle(el).borderColor)
    expect(stateValid[state]).toBe(backgroundColor)
  }

  async clickSubmitButtonInModalWindow(): Promise<void> {
    await this.submitButtonInModalWindow.click()
  }
}