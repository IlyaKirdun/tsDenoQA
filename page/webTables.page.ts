import {expect, Locator, Page} from "@playwright/test"

export default class WebTablesPage {
  page: Page
  addUserButton: Locator
  searchInput: Locator
  noRowsInput: Locator
  pageNumberInput: Locator
  clickOnTable: Locator

  constructor(page: Page) {
    this.page = page
    this.addUserButton = this.page.locator('//div[@class= "web-tables-wrapper"]//button[@id= "addNewRecordButton"]')
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
      userEmail: 4,
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

  public async fillSearchInput(userEmail: string): Promise<void> {
    await this.fill(this.searchInput, userEmail)
  }

  public async fillPageNumberInput(pageNumber: number): Promise<void> {
    await this.fill(this.searchInput, `${pageNumber}`)
  }

  private async fill(nameInput: Locator, fillData: string): Promise<void> {
    await nameInput.fill(fillData)
  }

  async clickOnSortingCell(cellName: string): Promise<void> {
    const keyWordFromCellLocator: { [key: string]: number} = {
      firstName: 1,
      lastName: 2,
      age: 3,
      userEmail: 4,
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
      userEmail: 4,
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

  async clickPaginate(nextOrPrevious: string): Promise<void> {
    await this.page.locator(`//div[@class="pagination-bottom"]
    //button[text()="${nextOrPrevious}"]`).click()
  }

  async checkAmountRows(row: number): Promise<void> {
    const getCurrentAmountRows = this.page.locator(`//div[@class="rt-tbody"]//div[@class="rt-tr-group"]`)
    expect(await getCurrentAmountRows.count()).toStrictEqual(row)
  }
}