import {expect, Locator, Page} from "@playwright/test"
import {ActionState, VisibilityState} from "../utils/types";

export default class DynamicProperties {
  page: Page
  textRandomId: Locator
  dynamicStateButton: Locator
  dynamicColorButton: Locator
  dynamicVisibilityButton: Locator

  colorMap: { [key: string] : string } = {
    red: 'rgb(220, 53, 69)',
    white: 'rgb(255, 255, 255)'
  }

  constructor(page: Page) {
    this.page = page
    this.textRandomId = this.page.locator('//p[text()="This text has random Id"]')
    this.dynamicStateButton = this.page.locator('//button[@id="enableAfter"]')
    this.dynamicColorButton = this.page.locator('//button[@id="colorChange"]')
    this.dynamicVisibilityButton = this.page.locator('//button[@id="visibleAfter"]')
  }

  async getTextId(): Promise<string | null> {
    const actualId: string | null = await this.textRandomId.getAttribute('id')

    if (actualId === null) {
      process.exit(1)
    }
    return actualId
  }

  async verifyButtonState(state: ActionState, delay: number = 0): Promise<void> {
    new Promise(resolve => setTimeout(resolve, delay))

    await expect(this.dynamicStateButton)[state]()
  }

  async verifyButtonColor(color: 'red' | 'white', delay: number = 0): Promise<void> {
    const expectedColor = this.colorMap[color]

    new Promise(resolve => setTimeout(resolve, delay))

    await expect(this.dynamicColorButton).toHaveCSS('color', expectedColor)
  }

  async verifyButtonVisibility(state: VisibilityState, delay: number = 0): Promise<void> {
    new Promise(resolve => setTimeout(resolve, delay))

    await expect(this.dynamicVisibilityButton)[state]()
  }
}