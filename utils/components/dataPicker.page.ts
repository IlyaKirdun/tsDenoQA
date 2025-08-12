import {expect, Locator, Page} from "@playwright/test"
import {VisibilityState} from "../types";

export default class DatePicker {
  page: Page
  selectDateInput: Locator
  dateAndTimeInput: Locator
  monthYearNavigationOutput: Locator

  colorMap: { [key: string] : string } = {
    blue: 'rgb(33,107,165)',
  }

  constructor(page: Page) {
    this.page = page
    this.selectDateInput = this.page.locator('//input[@id="datePickerMonthYearInput"]')
    this.dateAndTimeInput = this.page.locator('//input[@id="dateAndTimePickerInput"]')
    this.monthYearNavigationOutput = this.page.locator('//div[@id="datePickerMonthYear"]//div[contains(@class, "header")]/div[contains(@class, "current-month")]')
  }

  getCurrentDateForSelectDate() {
    let date = new Date()

    return date.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })
  }

  getCurrentDateForDateAndTime(){
    let date = new Date()
    const formatedDate = date.toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
    const formatedTime = date.toLocaleTimeString("en-US", {hour12: true, hour: "2-digit", minute: "2-digit"})

    return `${formatedDate} ${formatedTime}`
  }

  async verifyDataPickerTabByState(name: 'dateAndTimePicker' | 'datePickerMonthYear', state: VisibilityState): Promise<void> {
    const tab: Locator = this.page.locator(`//div[@id="${name}"]//div[@class="react-datepicker-popper"]`)

    await expect(tab)[state]()
  }

  async verifyDayColor(dayNumber: number, color: string): Promise<void> {
    const day: Locator = this.page.locator(`//div[contains(@class, "day--selected")][text()="${dayNumber}"]`)
    const currentColor: string = await day.evaluate(el => getComputedStyle(el).backgroundColor)

    expect(currentColor).toBe(this.colorMap[color])
  }

  async clickNavigationMonthButtonByAction(action: 'Previous' | 'Next'): Promise<void> {
    await this.page.locator(`//button[text()="${action} Month"]`).click()
  }

  async clickNavigationYearDropdownMenuButtonByAction(action: 'next' | 'previous'): Promise<void> {
    const nextOrPrevious = action == "next" ? 'first' : 'last'

    await this.page.locator(`//div[contains(@class, "year-dropdown")]//div[contains(@class, "year-option")]`)[nextOrPrevious]().click()
  }

  async selectDayByNumber(day: number): Promise<void> {
    const firstOrLast = day >= 15 ? 'first' : 'last'

    await this.page.locator(`(//div[@class="react-datepicker__month"]//div[text()="${day}"])`)[firstOrLast]().click()
  }

  async pickSelectMenuByName(menuName: 'month' | 'year', value: string): Promise<void> {
    await this.page.locator(`//div[@id="datePickerMonthYear"]//select[contains(@class, "${menuName}")]`).selectOption(value)
  }

  async pickDropdownMenuByName(menuName: 'month' | 'year', value: string | number): Promise<void> {
    await this.page.locator(`//div[@id="dateAndTimePicker"]//div[contains(@class, "${menuName}-dropdown")]`).click()
    await this.page.locator(`//div[contains(@class, "${menuName}-dropdown")]/div[text()="${value}"]`).click()
  }
}

