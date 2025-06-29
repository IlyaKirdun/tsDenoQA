import {expect, Locator, Page} from "@playwright/test"
import {VisibilityState} from "../utils/types";

export default class ButtonPage {
    page: Page
    doubleClickButton: Locator
    rightClickButton: Locator
    dynamicButton: Locator

    constructor(page: Page) {
        this.page = page
        this.doubleClickButton = this.page.locator('//button[@id="doubleClickBtn"]')
        this.rightClickButton = this.page.locator('//button[@id="doubleClickBtn"]')
        this.dynamicButton = this.page.locator('//button[text()="Click Me"]')
    }

    async clickButtonByState(locatorName: Locator, state: 'click' | 'dblclick'): Promise<void> {
        await locatorName[state]()
    }

    async clickRightClickButton() {
        await this.rightClickButton.click({ button: "right"})
    }

    async checkVisibilityButtonMessage(buttonName: 'double' | 'right' | 'dynamic', state: VisibilityState): Promise<void> {
        const buttonMessage: Locator = this.page.locator(`//p[@id="${buttonName}ClickMessage"]`)

        await expect(buttonMessage)[state]()
    }

    async getCurrentDynamicButtonId(){
        await this.dynamicButton.getAttribute("id")
    }
}