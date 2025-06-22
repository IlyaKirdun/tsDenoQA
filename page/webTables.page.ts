import {expect, Locator, Page} from "@playwright/test"
import {defaultUserObject, SelectingAmountRows, SortingCell, VisibilityState} from "../utils/types"
import RegistrationModalWindow from "../utils/components/registrationModalWindow";

export default class WebTablesPage {
  page: Page

  registrationModalWindow: RegistrationModalWindow

  addUserButton: Locator
  searchInput: Locator
  noRowsInput: Locator
  pageNumberInput: Locator
  clickOnTable: Locator

  departmentList: string[] = [
      'QA',
      'Legal',
      'Insurance',
      'Compliance',
      'HR',
      'Product Manager',
      'AQA',
      'Manual',
      'Support',
      'Test',
  ]

  constructor(page: Page) {
    this.page = page

    this.registrationModalWindow = new RegistrationModalWindow(this.page)

    this.addUserButton = this.page.locator('//div[@class= "web-tables-wrapper"]//button[@id= "addNewRecordButton"]')
    this.searchInput = this.page.locator('//input[@id= "searchBox"]')
    this.noRowsInput = this.page.locator('//div[@class="rt-noData"]')
    this.pageNumberInput = this.page.locator('//div[@class="pagination-bottom"]//div[@class="-pageJump"]/input')
    this.clickOnTable = this.page.locator('//div[@class="rt-tr-group"][5]//div[@class="rt-td"][3]')
  }

  async clickAddUserButton(): Promise<void> {
    await this.addUserButton.click()
  }

  async getUserData(userEmail: string, cellNames: SortingCell): Promise<string> {
   const keyWordFromUserLocator: { [key : string] : number } = {
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

  public async fillSearchInput(userData: string): Promise<void> {
    await this.fill(this.searchInput, userData)
  }

  public async fillPageNumberInput(pageNumber: number): Promise<void> {
    await this.fill(this.pageNumberInput, `${pageNumber}`)
    await this.page.keyboard.press('Enter')
  }

  private async fill(nameLocator: Locator, fillData: string): Promise<void> {
    await nameLocator.fill(fillData)
  }

  async clickOnSortingCell(cellName: SortingCell): Promise<void> {
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

  async getFirstUserData(cellName: SortingCell): Promise<string> {
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

  async clickEditUserButton(userEmail: string): Promise<void> {
    await this.page.locator(`//div[@class="rt-tr-group"]//div[text()="${userEmail}"]/parent::div//span[@title="Edit"]`).click()
  }

  async clickDeleteUserButtonByUserEmail(userEmail: string): Promise<void> {
    await this.page.locator(`//div[@class="rt-tr-group"]//div[text()="${userEmail}"]/parent::div//span[@title="Delete"]`).click()
  }

  async verifyIndicatorTableEmpty(state: VisibilityState): Promise<void> {
    await expect(this.noRowsInput)[state]()
  }

  async checkVisibilityUserByEmail(userEmail: string, state: VisibilityState): Promise<void> {
    const element = this.page.locator(`//div[text()="${userEmail}"]`)

    await expect(element)[state]()
  }

  async rowsPerPage(rows: number): Promise<void> {
    await this.page.locator('//div[@class="pagination-bottom"]' +
      '//select[@aria-label="rows per page"]').selectOption(`${rows}`)
  }

  async clickPaginate(nextOrPrevious: string): Promise<void> {
    await this.page.locator(`//div[@class="pagination-bottom"]
    //button[text()="${nextOrPrevious}"]`).click()
  }

  async checkAmountRows(row: SelectingAmountRows): Promise<void> {
    const rowAmount = this.page.locator(`//div[@class="rt-tbody"]//div[@class="rt-tr-group"]`)
    expect(await rowAmount.count()).toStrictEqual(row)
  }

  async addUser(index: number = 1): Promise<string> {
    await this.addUserButton.click()
    await this.registrationModalWindow.fillInputDataByInputName('firstName', `${defaultUserObject.firstName}${index}`)
    await this.registrationModalWindow.fillInputDataByInputName('lastName', `${defaultUserObject.lastName}${index}`)
    await this.registrationModalWindow.fillInputDataByInputName('userEmail', `${index}${defaultUserObject.userEmail}`)
    await this.registrationModalWindow.fillInputDataByInputName('age', `${defaultUserObject.age}${index}`)
    await this.registrationModalWindow.fillInputDataByInputName('salary', `${index}${defaultUserObject.salary}`)
    await this.registrationModalWindow.fillInputDataByInputName('department', `${this.departmentList[index - 1]}`)
    await this.registrationModalWindow.clickSubmitButtonInModalWindow()

    return `${index}${defaultUserObject.userEmail}`
  }

  async usersGenerator(userCount: number): Promise<string[]> {
    const usersEmailArray: string[] = []
    for (let index: number = 1; index <= userCount; index++) {
      usersEmailArray.push(await this.addUser(index))
    }

    return usersEmailArray
  }

  async deleteAddedUsers(usersEmail: string[]): Promise<void> {
    for (const email of usersEmail) {
      await this.clickDeleteUserButtonByUserEmail(email)
    }
  }
}