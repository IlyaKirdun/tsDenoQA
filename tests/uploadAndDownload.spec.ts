import {test} from "@playwright/test"
import MainPage from "../page/main.page"
import NavigationBar from "../utils/components/navigationBar"
import UploadAndDownload from "../page/uploadAndDownload.page"
import {deleteFile, removeAds, verifyFileExist} from "../utils/functions"

test.describe('Проверка функциональности на странице "Upload and Download"', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let uploadAndDownload: UploadAndDownload

  test.beforeEach(async ({ page , context}) => {
    mainPage = new MainPage(page)
    navigationBar = new NavigationBar(page)
    uploadAndDownload = new UploadAndDownload(page, context)

    await mainPage.navigateToMainPage()
    await removeAds(page)
    await mainPage.clickOnElement('Elements')
    await navigationBar.clickElementInNavigationBar('Upload and Download')
    await removeAds(page)
  })

  test('CASE_1: Проверяем функционал кнопки "Download".', async () => {
    await test.step('Нажимаем кнопку "Download".', async () => {
      await uploadAndDownload.clickDownloadButton()
    })

    await test.step('Проверяем наличие скаченного файла "sampleFile".', async () => {
      verifyFileExist('sampleFile.jpeg')
    })
  })

  test('CASE_2: Проверяем функционал кнопки "Выберите файл".', async () => {
    await test.step('Нажимаем кнопку "Выберите файл" и выбираем файл "sampleFile".', async () => {
      await uploadAndDownload.clickUploadFileButtonAndSelectFile()
    })

    await test.step('Проверяем путь к файлу.', async () => {
      const filePath: string = 'C:\\fakepath\\fileForUpload.jpeg'
      await uploadAndDownload.verifyUploadFilePath(filePath)
    })
  })

  test.afterAll(async () => {
    deleteFile('sampleFile.jpeg')
  })
})
