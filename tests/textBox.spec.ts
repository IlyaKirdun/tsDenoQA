import { test } from '@playwright/test'
import MainPage from '../page/main.page'
import TextBoxPage from '../page/textBox.page'
import NavigationBar from '../utils/components/navigationBar'
import { removeAds } from '../utils/functions'

test.describe('Check the functioning of the "Text Box" section', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let textBoxPage: TextBoxPage

  const testData= {
    name: 'Ivan Ivanov',
    email: 'ivanov@gmail.com',
    currentAddress: 'address 1',
    permanentAddress: 'address 2'
  }

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    textBoxPage = new TextBoxPage(page)
    navigationBar = new NavigationBar(page)

    await mainPage.gotoMainPage()
    await removeAds(page)
    await mainPage.gotoCard('Elements')
    await navigationBar.gotoNavBar('Elements', 'Text Box')
    await removeAds(page)
  })

  test('CASE_1: Verify field of inputs in page', async () => {
    test.setTimeout(3000)
    await test.step(`Fill the "Full Name" input field with ${testData.name}`, async () => {
      await textBoxPage.fillInputByName(testData.name, textBoxPage.fullNameInput)

    })

    await test.step(`Fill the "Email" input field with ${testData.email}`, async () => {
      await textBoxPage.fillInputByName(testData.email, textBoxPage.userEmailInput)
    })

    await test.step(`Fill the "Current Address" input field with ${testData.currentAddress}`, async () => {
      await textBoxPage.fillInputByName(testData.currentAddress, textBoxPage.currentAddressInput)
    })

    await test.step(`Fill the "Permanent Address" input field with ${testData.permanentAddress}`, async () => {
      await textBoxPage.fillInputByName(testData.permanentAddress, textBoxPage.permanentAddressInput)
    })

    await test.step('Click "submit" button', async () => {
      await textBoxPage.clickSubmitButton()
    })

    await test.step(`Match the "Name" output field and ${testData.name} data`, async () => {
      await textBoxPage.isDataMatch(`Name:${testData.name}`, textBoxPage.nameOutput)
    })

    await test.step(`Match the "Email" output field and ${testData.email}`, async () => {
      await textBoxPage.isDataMatch(`Email:${testData.email}`, textBoxPage.emailOutput)
    })

    await test.step(`Match the "Current Address" output field and ${testData.currentAddress}`, async () => {
      await textBoxPage.isDataMatch(`Current Address :${testData.currentAddress} `, textBoxPage.currentAddressOutput)
    })

    await test.step(`Match the "Permanent Address" output field and ${testData.permanentAddress}`, async () => {
      await textBoxPage.isDataMatch(`Permananet Address :${testData.permanentAddress}`, textBoxPage.permanentAddressOutput)
    })
  })
})
