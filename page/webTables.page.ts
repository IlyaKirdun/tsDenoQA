import {expect, Locator, Page} from "@playwright/test"

export default class WebTablesPage {
  page: Page
  addUserButton: Locator
  closeModalWindowButton: Locator
  modalWindow: Locator
  submitButtonInModalWindow: Locator
  searchInput: Locator

  constructor(page: Page) {
    this.page = page
    this.addUserButton = this.page.locator('//div[@class= "web-tables-wrapper"]//button[@id= "addNewRecordButton"]')
    this.modalWindow = this.page.locator('//div[@class="modal-header"]')
    this.closeModalWindowButton = this.page.locator('//div[@role= "dialog"]//button[@class= "close"]')
    this.submitButtonInModalWindow = this.page.locator('//div[@class= "modal-body"]//button[@id= "submit"]')
    this.searchInput = this.page.locator('//input[@id= "searchBox"]')
  }

  testUserData: { [key: string]: string} = {
    firstName: 'Cierra',
    lastName: 'Vega',
    age: '39',
    email: 'cierra@example.com',
    salary: '10000',
    department: 'Insurance'
  }

  async testPause(): Promise<void> {
    await this.page.pause()
  }

  async clickAddUserButton(): Promise<void> {
    await this.addUserButton.click()
  }

  async getUserData(userEmail: string, cellNames: string): Promise<string> {
   const keyWordFromUserLocator: { [key: string]: number} = {
      firstName: 1,
      lastName: 2,
      age: 3,
      email: 4,
      salary: 5,
      department: 6
    }
    const cellContent: string | null = await this.page.locator(`//div[text()="${userEmail}"]/parent::div//div[@class="rt-td"][${keyWordFromUserLocator[cellNames]}]`).textContent()
    if (cellContent === null) {
      process.exit(1)
    }

    return cellContent
  }

  async isUserDataMatch(expectUserData: string, currentUserData: string): Promise<void> {
    expect(expectUserData).toBe(currentUserData)
  }

  async fillSearchInput(userData: string): Promise<void> {
    await this.searchInput.fill(userData)
  }
}