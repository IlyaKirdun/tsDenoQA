import {BrowserContext, expect, Locator, Page} from "@playwright/test"
import path from "path";
import * as fs from "node:fs";

export default class UploadAndDownload {
  page: Page
  context: BrowserContext
  uploadFileButton: Locator
  downloadButton: Locator
  uploadFilePath: Locator

  downloadFilePath: string = path.normalize('C:\\Users\\Rabbit\\Downloads\\sampleFile.jpeg')

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

    await download.saveAs(this.downloadFilePath)
  }

  async verifyDownloadFile() {
    expect(fs.existsSync(this.downloadFilePath)).toBe(true)
  }

  async deleteDownloadFile() {
    fs.unlink(this.downloadFilePath, () => {})
  }

  async clickUploadFileButtonAndSelectFile(): Promise<void> {
    await this.uploadFileButton.setInputFiles(path.join('utils/testFiles/fileForUpload.jpeg'))
  }

  async verifyUploadFilePath(path: string): Promise<void> {
    await expect(this.uploadFilePath).toHaveText(path)
  }
}