import {expect, Locator, Page} from "@playwright/test"
import {SortingCell} from "../types";

export default class RegistrationModalWindow {
  page: Page
  closeModalWindowButton: Locator
  modalWindow: Locator
  submitButtonInModalWindow: Locator

  colorMap: { [key: string] : string } = {
    valid: 'rgb(40, 167, 69)',
    invalid: 'rgb(220, 53, 69)'
  }

  constructor(page: Page) {
    this.page = page
    this.modalWindow = this.page.locator('//div[@id="registration-form-modal"]')
    this.closeModalWindowButton = this.page.locator('//div[@role="dialog"]//button[@class="close"]')
    this.submitButtonInModalWindow = this.page.locator('//button[@id="submit"]')
  }

  async checkVisibilityByState(state: VisibilityState): Promise<void> {
    const element: Locator = this.modalWindow

    await expect(element)[state]()
  }

  async clickCloseModalWindowButton(): Promise<void> {
    await this.closeModalWindowButton.click()
  }

  async fillInputDataByInputName(inputName: SortingCell, testUserData: string): Promise<void> {
    await this.page.locator(`//div[@class="modal-body"]
    //input[@id="${inputName}"]`).fill(testUserData)
  }

  async verifyInputDataCorrectInModalWindow(inputName: SortingCell, testUserData: string): Promise<void> {
    const currentData: string | null = await this.page.locator(`
    //div[@class="modal-body"]//input[@id="${inputName}"]`).inputValue()
    expect(testUserData).toBe(currentData)
  }

  async verifyInputColorByState(inputName: SortingCell, state: 'valid' | 'invalid'): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const expectedColor = this.colorMap[state];

    const inputLocator: Locator = this.page.locator(`//div[@class="modal-body"]//input[@id="${inputName}"]`);

    const actualBorderColor = await inputLocator.evaluate(el =>
        getComputedStyle(el).borderColor
    );

    expect(actualBorderColor).toContain(expectedColor);
  }

  async clickSubmitButtonInModalWindow(): Promise<void> {
    await this.submitButtonInModalWindow.click()
  }
}