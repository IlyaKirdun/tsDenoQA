import {BrowserContext, expect, Locator, Page} from "@playwright/test"
import path from "path";

export default class UploadAndDownload {
  page: Page
  context: BrowserContext
  uploadFileButton: Locator
  downloadButton: Locator
  uploadFilePath: Locator

  constructor(page: Page, context: BrowserContext) {
    this.page = page
    this.context = context
    this.downloadButton = this.page.locator('//a[@id="downloadButton"]')
    this.uploadFileButton = this.page.locator('//input[@id="uploadFile"]')
    this.uploadFilePath = this.page.locator('//p[@id="uploadedFilePath"]')
  }

  async clickDownloadButton() {
    const downloadPromise = this.page.waitForEvent('download')
    await this.downloadButton.click()
    const download = await downloadPromise

    await download.saveAs(`${process.env.DOWNLOAD_FOLDER}/${download.suggestedFilename()}`)
  }

  async clickUploadFileButtonAndSelectFile(): Promise<void> {
    await this.uploadFileButton.setInputFiles(path.join('testFiles/fileForUpload.jpeg'))
  }

  async verifyUploadFilePath(path: string): Promise<void> {
    await expect(this.uploadFilePath).toHaveText(path)
  }
}