import {expect, test} from "@playwright/test"
import MainPage from "../../page/main.page"
import DatePicker from "../../utils/components/dataPicker.page";
import {removeAds} from "../../utils/functions";
import NavigationBar from "../../utils/components/navigationBar";
import {MonthList} from "../../utils/types";

test.describe('Проверка функциональности на странице "Date Picker', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let datePicker: DatePicker

  const monthList: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  test.beforeEach(async ({page}) => {
    mainPage = new MainPage(page)

    const newPage = await mainPage.navigateToMainPage()
    if (newPage !== page) { page = newPage }

    navigationBar = new NavigationBar(page)
    datePicker = new DatePicker(page)

    await removeAds(page)
    await mainPage.clickOnElement('Widgets')
    await navigationBar.clickElementInNavigationBar('Date Picker')
    await removeAds(page)
  })

  test('CASE_1: Проверка даты из поля виджета Select date.', async () => {
    await test.step('Сравниваю дату виджета "Select Date" с сегодняшней.', async () => {
      expect(await datePicker.selectDateInput.getAttribute('value')).toBe(datePicker.getCurrentDateForSelectDate())
    })
  })

  test('CASE_2: Проверяем функционал ручного ввода даты в "Select Date".', async () => {
    const date: string = '1 1 2011'
    const expectedDate: string = '01/01/2011'
    const day: string = '1'
    const stringMonth: MonthList = 'January'
    const numberMonth: number = 1
    const year: string = '2011'

    await test.step('Нажимаем на виджет "Select Date".', async () => {
      await datePicker.selectDateInput.click()
    })

    await test.step('Проверяем что модальное окно открылось.', async () => {
      await datePicker.verifyDataPickerTabByState('datePickerMonthYear', 'toBeVisible')
    })

    await test.step('Очищаем поле ввода.', async () => {
      await datePicker.selectDateInput.fill('')
    })

    await test.step(`Вводим дату из ${date}`, async () => {
      await datePicker.selectDateInput.fill(date)
    })

    await test.step('Проверяем правильное отображение в поле ввода.', async () => {
      expect(date).toBe(await datePicker.selectDateInput.getAttribute('value'))
    })

    await test.step('Проверяем корректное отображение месяца в селект меню "Month".', async () => {
      await datePicker.verifyMonthOrYearInSelectMenu("month", `${numberMonth - 1}`)
    })

    await test.step('Проверяем корректное отображение года в селект меню "Year".', async () => {
      await datePicker.verifyMonthOrYearInSelectMenu("year", year)
    })

    await test.step('Проверяем корректное отображение месяца и года в шапке пагинации.', async () => {
      expect(`${stringMonth} ${year}`).toBe(await datePicker.monthYearNavigationOutput.textContent())
    })

    await test.step('Проверяем выделение дня в календаре.', async () => {
      await datePicker.verifyDayColor(day)
    })

    await test.step('Нажимаем клавишу "Ввод".', async () => {
      await datePicker.clickEnterOnKeyboard()
    })

    await test.step('Проверяем что модальное окно закрылось.', async () => {
      await datePicker.verifyDataPickerTabByState('datePickerMonthYear', 'toBeHidden')
    })

    await test.step('Проверяем корректное отображение даты.', async () => {
      expect(await datePicker.selectDateInput.inputValue()).toBe(expectedDate)
    })
  })

  test('CASE_3: Проверка функционала выбора месяца и года через селект меню в "Select Date".', async () => {
    const stringMonth: MonthList = 'January'
    const numberMonth: number = 1
    const year: number = 2011

    await test.step('Pre-condition', async () => {
      await test.step('Нажимаем на виджет "Select date".', async () => {
        await datePicker.selectDateInput.click()
      })

      await test.step('Проверяем что модальное окно открылось.', async () => {
        await datePicker.verifyDataPickerTabByState('datePickerMonthYear', 'toBeVisible')
      })
    })

    await test.step(`Выбираем ${stringMonth} в выпадающем меню "Month".`, async () => {
      await datePicker.selectMonthOrYearInSelectMenu('month', stringMonth)
    })

    await test.step('Проверяем корректное отображение месяца в селект меню "Month".', async () => {
      await datePicker.verifyMonthOrYearInSelectMenu("month", `${numberMonth - 1}`)
    })

    await test.step(`Выбираем ${year} в выпадающем меню "Year".`, async () => {
      await datePicker.selectMonthOrYearInSelectMenu('year', year)
    })

    await test.step('Проверяем корректное отображение года в селект меню "Year".', async () => {
      await datePicker.verifyMonthOrYearInSelectMenu("year", `${year}`)
    })

    await test.step('Проверяем корректное отображение месяца и года в шапке пагинации.', async () => {
      expect(`${stringMonth} ${year}`).toBe(await datePicker.monthYearNavigationOutput.textContent())
    })
  })

  test('CASE_4: Проверяем пагинацию дней месяца в "Select Date".', async () => {
    let month: string = ''

    await test.step('Pre-condition', async () => {
      await test.step('Нажимаем на виджет "Select date".', async () => {
        await datePicker.selectDateInput.click()
      })

      await test.step('Проверяем что модальное окно открылось.', async () => {
        await datePicker.verifyDataPickerTabByState('datePickerMonthYear', 'toBeVisible')
      })
    })

    await test.step(`Сохраняем текущий месяц в ${month}.`, async () => {
      month = await datePicker.selectDateInput.inputValue()
    })

    await test.step('Нажимаем кнопку "Предыдущий месяц".', async () => {
      await datePicker.clickNavigationMonthButtonByAction('Previous')
    })

    await test.step('Проверяем корректное отображение месяца в селект меню "Month".', async () => {
      await datePicker.verifyDataPickerTabByState('datePickerMonthYear', 'toBeVisible')
    })

    await test.step('Проверяем корректное отображение месяца в шапке пагинации.', async () => {
      await datePicker.verifyDataPickerTabByState('datePickerMonthYear', 'toBeVisible')
    })

    await test.step(`Сравниваем текущий месяц с ${month}.`, async () => {
      await datePicker.verifyDataPickerTabByState('datePickerMonthYear', 'toBeVisible')
    })

    await test.step(`Сохраняем текущий месяц в ${month}.`, async () => {
      await datePicker.verifyDataPickerTabByState('datePickerMonthYear', 'toBeVisible')
    })

    await test.step('Нажимаем кнопку "Следующий месяц".', async () => {
      await datePicker.verifyDataPickerTabByState('datePickerMonthYear', 'toBeVisible')
    })

    await test.step('Проверяем корректное отображение месяца в селект меню "Month".', async () => {
      await datePicker.verifyDataPickerTabByState('datePickerMonthYear', 'toBeVisible')
    })

    await test.step('Проверяем корректное отображение месяца в шапке пагинации.', async () => {
      await datePicker.verifyDataPickerTabByState('datePickerMonthYear', 'toBeVisible')
    })

    await test.step('Сравниваем текущий месяц с ${month}.', async () => {
      await datePicker.verifyDataPickerTabByState('datePickerMonthYear', 'toBeVisible')
    })
  })

  test('CASE_5: Проверяем выбор полной даты в "Select Date".', async () => {
    const stringMonth: MonthList = 'August'
    const numberMonth: number = 8
    const day: number = 25
    const year: number = 2030
    const extendedDate: string = '08/25/2030'

    await test.step('Нажимаем на виджет "Select date".', async () => {
      await datePicker.selectDateInput.click()
    })

    await test.step('Проверяем что модальное окно открылось.', async () => {
      await datePicker.verifyDataPickerTabByState('datePickerMonthYear', 'toBeVisible')
    })

    await test.step(`Выбираем ${stringMonth} в выпадающем меню "Month".`, async () => {
      await datePicker.selectMonthOrYearInSelectMenu('month', stringMonth)
    })

    await test.step('Проверяем корректное отображение месяца в селект меню "Month".', async () => {
      await datePicker.verifyMonthOrYearInSelectMenu("month", `${numberMonth - 1}`)
    })

    await test.step(`Выбираем ${year} в выпадающем меню "Year".`, async () => {
      await datePicker.selectMonthOrYearInSelectMenu('year', year)
    })

    await test.step('Проверяем корректное отображение года в селект меню "Year".', async () => {
      await datePicker.verifyMonthOrYearInSelectMenu("year", `${year}`)
    })

    await test.step('Проверяем корректное отображение месяца и года в шапке пагинации.', async () => {
      expect(`${stringMonth} ${year}`).toBe(await datePicker.monthYearNavigationOutput.textContent())
    })

    await test.step(`Выбираем ${day}.`, async () => {
      await datePicker.selectDayByNumber(day)
    })

    await test.step('Проверяем что модальное окно закрылось.', async () => {
      await datePicker.verifyDataPickerTabByState('datePickerMonthYear', 'toBeHidden')
    })

    await test.step(`Сравниваем поле виджета "Select Date".`, async () => {
      expect(extendedDate).toBe(await datePicker.selectDateInput.inputValue())
    })
  })

  test('CASE_6: Проверка даты из поля виджета "Data And Time".', async () => {
    await test.step(`Сравниваем дату виджета "Data And Time" с сегодняшней.`, async () => {
      expect(await datePicker.dateAndTimeInput.getAttribute('value')).toBe(datePicker.getCurrentDateForDateAndTime())
    })
  })

  test('CASE_7: Проверяем функционал выбора месяца и года через выпадающие меню виджета "Date And Time".', async () => {
    const month: MonthList = 'May'
    const year: number = 2030

    await test.step('Pre-condition', async () => {
      await test.step('Нажимаем на виджет "Date And Time".', async () => {
        await datePicker.dateAndTimeInput.click()
      })

      await test.step('Проверяем что модальное окно открылось.', async () => {
        await datePicker.verifyDataPickerTabByState('dateAndTimePicker', 'toBeVisible')
      })
    })

    await test.step(`Выбираем ${month} в выпадающем меню "Month".`, async () => {
      await datePicker.selectMonthOrYearInDropdownMenu('month', month)
    })

    await test.step('Проверяем корректное отображение месяца в выпадающем меню "Month".', async () => {
      await datePicker.verifyMonthOrYearInDropdownMenu('month', month)
    })

    await test.step(`Выбираем ${year} в выпадающем меню "Year".`, async () => {
      await datePicker.selectMonthOrYearInDropdownMenu('year', year)
    })

    await test.step('Проверяем корректное отображение года в выпадающем меню "Year".', async () => {
      await datePicker.verifyMonthOrYearInDropdownMenu('year', year)
    })

    await test.step('Проверяем корректное отображение месяца и года в шапке пагинации.', async () => {
      expect(`${month} ${year}`).toBe(await datePicker.monthYearNavigationOutput.textContent())
    })
  })
})
