import {Locator, Page} from "@playwright/test"
import {assertByState} from "../utils/functions";

export default class ButtonPage {
    page: Page
    doubleClickButton: Locator
    rightClickButton: Locator
    dynamicButton: Locator

    constructor(page: Page) {
        this.page = page
        this.doubleClickButton = this.page.locator('//button[@id="doubleClickBtn"]')
        this.rightClickButton = this.page.locator('//button[@id="rightClickBtn"]')
        this.dynamicButton = this.page.locator('//button[text()="Click Me"]')
    }

    async clickButtonByState(locatorName: Locator, state: 'click' | 'dblclick'): Promise<void> {
        await locatorName[state]()
    }

    async clickRightClickButton() {
        await this.rightClickButton.click({ button: 'right' })
    }

    async verifyMatchButtonMessage(locatorName: 'double' | 'right' | 'dynamic'): Promise<void> {
        const buttonMessages: { [key : string] : string } = {
            double: 'You have done a double click',
            right: 'You have done a right click',
            dynamic: 'You have done a dynamic click',
        }

        const expectedButtonMessage: string = buttonMessages[locatorName]
        const actualButtonMessage: string | null = await this.page.locator(`//p[@id="${locatorName}ClickMessage"]`).textContent()

        if (actualButtonMessage === null) {
            process.exit(1)
        }

        await assertByState(actualButtonMessage, expectedButtonMessage)
    }

    async getCurrentDynamicButtonId(){
        const currentId: string | null = await this.dynamicButton.getAttribute("id")

        if (currentId === null) {
            process.exit(1)
        }

        return currentId
    }
}