import { test } from '@playwright/test'
import MainPage from '../page/main.page'
import RadioButtonPage from '../page/radioButton.page'
import NavigationBar from '../utils/components/navigationBar'
import { removeAds } from '../utils/functions'

const testDataInput = {
  yesButton: 'yesRadio',
  impressiveButton: 'impressiveRadio',
  noButton: 'noRadio'
}

const testDataOutput = {
  yesButton: 'Yes',
  impressiveButton: 'Impressive'
}

test.describe('Check the functioning of the "Text Box" section', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let radioButtonPage: RadioButtonPage

  test.beforeEach(async ({page}) => {
    mainPage = new MainPage(page)
    radioButtonPage = new RadioButtonPage(page)
    navigationBar = new NavigationBar(page)

    await mainPage.gotoMainPage()
    await removeAds(page)
    await mainPage.gotoCard('Elements')
    await navigationBar.gotoNavBar('Elements', 'Radio Button')
    await removeAds(page)
  })

  test('CASE_1: Проверка работы нажатия радиокнопки', async () => {
    await test.step(`Нажать на радиокнопку "Yes"`, async () => {
      await radioButtonPage.clickOnRadioButton(testDataInput.yesButton)
    })

    await test.step(`Проверка результата`, async () => {
      await radioButtonPage.checkIsDataMatch(testDataOutput.yesButton)
    })
  })

  test('CASE_2: Проверка результата при нажатии на иную радиокнопку', async () => {
    await test.step(`Нажать на радиокнопку "Impressive"`, async () => {
      await radioButtonPage.clickOnRadioButton(testDataInput.impressiveButton)
    })

    await test.step(`Проверка результата`, async () => {
      await radioButtonPage.checkIsDataMatch(testDataOutput.impressiveButton)
    })
  })

  test('CASE_3: Проверка на то что радиокнопка "No" неактивна.', async () => {
    await test.step(`Проверка радиокнопки "No".`, async () => {
      await radioButtonPage.checkForInactiveButton(testDataInput.noButton)
    })
  })
})