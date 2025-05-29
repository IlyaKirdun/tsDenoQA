import { Page } from '@playwright/test'

export async function removeAds(page: Page) {
  const extendAds:string[] = [
    '//div[@id="fixedban"]',
    '//div[@id="Ad.Plus-970x250-1"]',
    '//div[@id="Ad.Plus-970x250-2"]',
    '//div[@class="sidebar-content pattern-backgound shadow widget-divider-off"]',
  ]

  for (const ads of extendAds) {
    let loc = page.locator(ads)

    if(await loc.isVisible() ){
      await loc.evaluate((elem) => elem.remove())
    }
  }
}