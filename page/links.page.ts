import {BrowserContext, expect, Locator, Page,} from "@playwright/test";
import {locatorLinkNames} from "../utils/types";

export default class linksPage {
  page: Page
  context: BrowserContext
  dynamicLink: Locator
  linkMessage: Locator

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context

    this.dynamicLink = page.locator('//a[@id="dynamicLink"]')
    this.linkMessage = page.locator('//p[@id="linkResponse"]')
  }

  async clickAndVerifyLinkByName(locatorName: 'simpleLink' | 'dynamicLink'): Promise<void> {
    const newPagePromise: Promise<Page> = this.context.waitForEvent('page')

    await this.page.locator(`//a[@id="${locatorName}"]`).click()
    const newPage: Page = await newPagePromise
    const numberOfPages: number = this.context.pages().length

    await newPage.waitForURL('https://demoqa.com')
    await expect(newPage).toHaveURL('https://demoqa.com')
    expect(numberOfPages).toBe(2)
  }

  async getDynamicLinkInputValue(): Promise<string> {
    const actualLinkName: string | null = await this.dynamicLink.innerText()

    if(actualLinkName == null){
      process.exit(1)
    }

    return actualLinkName
  }

  async clickLinkByName(linkName: locatorLinkNames): Promise<void> {
    await this.page.locator(`//a[@id="${linkName}"]`).click()
  }

  async verifyLinkMessage(linkName: locatorLinkNames): Promise<void> {
    const messagesList: { [ key : string ]: string } = {
      'created': 'Link has responded with staus 201 and status text Created',
      'no-content': 'Link has responded with staus 204 and status text No Content',
      'moved': 'Link has responded with staus 301 and status text Moved Permanently',
      'bad-request': 'Link has responded with staus 400 and status text Bad Request',
      'unauthorized': 'Link has responded with staus 401 and status text Unauthorized',
      'forbidden': 'Link has responded with staus 403 and status text Forbidden',
      'invalid-url': 'Link has responded with staus 404 and status text Not Found'
    }
    const actualMessage: string | null = await this.linkMessage.textContent()

    if(actualMessage == null){
      process.exit(1)
    }

    expect(actualMessage).toBe(messagesList[linkName])
  }

  async verifyApiResponse(statusCode: number, statusText: string): Promise<void> {
    let url: string = statusText.toLowerCase().replace(' ', '-')

    if(url == 'not-found'){
      url = 'invalid-url'
    }
    if (url == 'moved'){
      statusText = 'Moved Permanently'
    }

    const response = this.page.waitForResponse(response =>
      response.url() == `${process.env.BASE_URL}${url}`
      && response.status() == statusCode
      && response.statusText() == statusText
    )

    await this.page.locator(`//a[@id="${url}"]`).click()

    await response
  }

  async getLinkMessage(): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const actualLinkMassage: string | null = await this.linkMessage.textContent()

    if(actualLinkMassage == null){
      process.exit(1)
    }

    return actualLinkMassage
  }
}