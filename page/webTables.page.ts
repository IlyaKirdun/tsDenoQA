import {expect, Locator, Page} from "@playwright/test"

export default class WebTablesPage {
  page: Page
  addUserButton: Locator
  closeModalWindowButton: Locator
  modalWindow: Locator
  submitButtonInModalWindow: Locator
  searchInput: Locator
  noRowsInput: Locator
  pageNumberInput: Locator
  clickOnTable: Locator

  constructor(page: Page) {
    this.page = page
    this.addUserButton = this.page.locator('//div[@class= "web-tables-wrapper"]//button[@id= "addNewRecordButton"]')
    this.modalWindow = this.page.locator('//div[@class="modal-header"]')
    this.closeModalWindowButton = this.page.locator('//div[@role= "dialog"]//button[@class= "close"]')
    this.submitButtonInModalWindow = this.page.locator('//div[@class= "modal-body"]//button[@id= "submit"]')
    this.searchInput = this.page.locator('//input[@id= "searchBox"]')
    this.noRowsInput = this.page.locator('//div[@class="rt-noData"]')
    this.pageNumberInput = this.page.locator('//div[@class="pagination-bottom"]//div[@class="-pageJump"]/input')
    this.clickOnTable = this.page.locator('//div[@class="rt-tr-group"][5]//div[@class="rt-td"][3]')
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
    const cellContent: string | null = await this.page.locator(`//div[text()="${userEmail}"]
    /parent::div//div[@class="rt-td"][${keyWordFromUserLocator[cellNames]}]`).textContent()
    if (cellContent === null) {
      process.exit(1)
    }

    return cellContent
  }

  async isUserDataMatch(expectUserData: string, currentUserData: string): Promise<void> {
    expect(expectUserData).toBe(currentUserData)
  }

  async isUserNotDataMatch(expectUserData: string, currentUserData: string): Promise<void> {
    expect(expectUserData).not.toBe(currentUserData)
  }

  async fillSearchInput(userData: string): Promise<void> {
    await this.searchInput.fill(userData)
  }

  async clickOnSortingCell(cellName: string): Promise<void> {
    const keyWordFromCellLocator: { [key: string]: number} = {
      firstName: 1,
      lastName: 2,
      age: 3,
      email: 4,
      salary: 5,
      department: 6
    }
    await this.page.locator(`//div[@class="rt-tr"]
    //div[@class="rt-th rt-resizable-header -cursor-pointer"][${keyWordFromCellLocator[cellName]}]`).click()
  }

  async getFirstUserData(cellName: string): Promise<string> {
    const keyWordFromCellUserData: { [key: string]: number} = {
      firstName: 1,
      lastName: 2,
      age: 3,
      email: 4,
      salary: 5,
      department: 6
    }
    const cellContent: string | null = await this.page.locator(`
    //div[@class="rt-tr-group"][1]//div[@class="rt-td"][${keyWordFromCellUserData[cellName]}]`).textContent()

    if (cellContent === null) {
      process.exit(1)
    }

    return cellContent
  }

  async editUser(): Promise<void> {
    await this.page.locator(`//div[@class="rt-tr-group"][1]//div[@class="rt-td"][7]//span[@title= "Edit"]`).click()
  }

  async deleteUser(): Promise<void> {
    await this.page.locator(`//div[@class="rt-tr-group"][1]//div[@class="rt-td"][7]//span[@title= "Delete"]`).click()
  }

  async isTableEmpty(): Promise<void> {
    await expect(this.noRowsInput).toBeVisible()
  }

  async selectRowsOnPage(manyRows: string): Promise<void> {
    await this.page.locator('//div[@class="pagination-bottom"]' +
      '//select[@aria-label="rows per page"]').selectOption(`${manyRows}`)
  }

  async getPageNumber(): Promise<string> {
    let pageNumber: string | null = await this.pageNumberInput.getAttribute('value')

    if (pageNumber === null) {
      process.exit(1)
    }

    return pageNumber
  }

  async clickPaginate(nextOrPrevious: string): Promise<void> {
    await this.page.locator(`//div[@class="pagination-bottom"]
    //button[text()="${nextOrPrevious}"]`).click()
  }

  async isPageMatch(beforePage: string): Promise<void> {
    let currentPage: string | null = await this.pageNumberInput.getAttribute('Value')
    expect(beforePage).toBe(currentPage)
  }

  async isPageNotMatch(beforePage: string): Promise<void> {
    let currentPage: string | null = await this.pageNumberInput.getAttribute('Value')
    expect(beforePage).not.toBe(currentPage)
  }

  async fillPageNumbers(pageNumber: string): Promise<void> {
    await this.pageNumberInput.fill(pageNumber)
    await this.clickOnTable.click()
  }

  async checkAmountRows(row: number): Promise<void> {
    const getCurrentAmountRows = await this.page.$$(`//div[@class="rt-tbody"]//div[@class="rt-tr-group"]`)
    expect(getCurrentAmountRows).toHaveLength(row)
  }
}