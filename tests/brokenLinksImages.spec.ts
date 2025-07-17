import {test} from "@playwright/test"
import MainPage from "../page/main.page"
import NavigationBar from "../utils/components/navigationBar"
import BrokenLinksImages from "../page/brokenLinksImages.page"
import {removeAds} from "../utils/functions"

test.describe('Проверка функциональности на странице "Links', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let brokenLinksImages: BrokenLinksImages

  test.beforeEach(async ({ page , context}) => {
    mainPage = new MainPage(page)
    navigationBar = new NavigationBar(page)
    brokenLinksImages = new BrokenLinksImages(page, context)

    await mainPage.navigateToMainPage()
    await removeAds(page)
    await mainPage.clickOnElement('Elements')
    await navigationBar.clickElementInNavigationBar('Broken Links - Images')
    await removeAds(page)
  })

  test('CASE_1: Проверяем правильное отображение изображения "Valid image".', async () => {
    await test.step('Проверяем отображение изображение "Valid image".', async () => {
      await brokenLinksImages.verifyImageByState(brokenLinksImages.validImage, 'valid')
    })
  })

  test('CASE_2: Проверяем правильное отображение изображения "Broken image".', async () => {
    await test.step('Проверяем отображение изображение "Broken image".', async () => {
      await brokenLinksImages.verifyImageByState(brokenLinksImages.brokenImage, 'broken')
    })
  })

  test('CASE_3: Проверяем ссылку "Valid link".', async () => {
    await test.step('Нажимаем на ссылку "Valid link".', async () => {
      await brokenLinksImages.clickAndVerifyLinkByName('Valid', 'valid')
    })
  })

  test('CASE_4: Проверяем ссылку "Broken link".', async () => {
    await test.step('Нажимаем на ссылку "Broken link".', async () => {
      await brokenLinksImages.clickAndVerifyLinkByName('Broken', 'broken')
    })
  })
})
