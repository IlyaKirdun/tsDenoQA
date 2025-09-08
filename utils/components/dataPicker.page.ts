import {expect, Locator, Page} from "@playwright/test"
import {MonthList, VisibilityState} from "../types";

export default class DatePicker {
  page: Page
  selectDateInput: Locator
  dateAndTimeInput: Locator
  monthYearNavigationOutput: Locator

  colorMap: { [key: string] : string } = {
    blue: 'rgb(33, 107, 165)',
  }

  constructor(page: Page) {
    this.page = page
    this.selectDateInput = this.page.locator('//input[@id="datePickerMonthYearInput"]')
    this.dateAndTimeInput = this.page.locator('//input[@id="dateAndTimePickerInput"]')
    this.monthYearNavigationOutput = this.page.locator('//div[contains(@class, "header")]/div[contains(@class, "current-month")]')
  }

  getCurrentDateForSelectDate() {
    const date = new Date()

    return date.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })
  }

  getCurrentDateForDateAndTime(){
    const date = new Date()
    const formatedDate = date.toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
    const formatedTime = date.toLocaleTimeString("en-US", {hour12: true, hour: "numeric", minute: "2-digit"})

    return `${formatedDate} ${formatedTime}`
  }

  async verifyMonthOrYearInSelectMenu(menuName: 'month' | 'year', valueMonthOrYear: string){
    await expect(this.page.locator(`//select[contains(@class,"${menuName}")]`)).toHaveValue(valueMonthOrYear)
  }

  async verifyMonthOrYearInDropdownMenu(menuName: 'month' | 'year', value: MonthList | number){
    expect(await this.page.locator(`//span[contains(@class, "selected-${menuName}")]`).innerText()).toBe(`${value}`)
  }

  async verifyDataPickerTabByState(name: 'dateAndTimePicker' | 'datePickerMonthYear', state: VisibilityState): Promise<void> {
    const tab: Locator = this.page.locator(`//div[@id="${name}"]//div[@class="react-datepicker-popper"]`)

    await expect(tab)[state]()
  }

  async verifyDayColor(dayNumber: string, color: string = this.colorMap.blue): Promise<void> {
    const day: Locator = this.page.locator(`//div[contains(@class, "day--selected")][text()="${dayNumber}"]`)
    const currentColor: string = await day.evaluate(el => getComputedStyle(el).backgroundColor)

    expect(currentColor).toBe(color)
  }

  async clickNavigationMonthButtonByAction(action: 'Previous' | 'Next'): Promise<void> {
    await this.page.locator(`//button[text()="${action} Month"]`).click()
  }

  async clickNavigationYearDropdownMenuButtonByAction(action: 'next' | 'previous'): Promise<void> {
    const nextOrPrevious = action == "next" ? 'first' : 'last'

    await this.page.locator(`//div[contains(@class, "year-dropdown")]//div[contains(@class, "year-option")]`)[nextOrPrevious]().click()
  }

  async clickEnterOnKeyboard(): Promise<void> {
    await this.selectDateInput.press('Enter')
  }

  async selectDayByNumber(day: number): Promise<void> {
    const firstOrLast = day >= 15 ? 'first' : 'last'

    await this.page.locator(`(//div[@class="react-datepicker__month"]//div[text()="${day}"])`)[firstOrLast]().click()
  }

  async selectMonthOrYearInSelectMenu(menuName: 'month' | 'year', value: MonthList | number): Promise<void> {
    await this.page.locator(`//div[@id="datePickerMonthYear"]//select[contains(@class, "${menuName}")]`).selectOption(`${value}`)
  }

  async selectMonthOrYearInDropdownMenu(menuName: 'month' | 'year', value: MonthList | number): Promise<void> {
    await this.page.locator(`//div[contains(@class,"${menuName}-dropdown-container")]/div[contains(@class,"${menuName}-read-view")]`).click()
    await this.page.locator(`//div[contains(@class,"${menuName}-dropdown-container")]//div[text()="${value}"]`).click()
  }
}