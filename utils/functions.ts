import {Page, expect, Locator} from '@playwright/test'

export async function removeAds(page: Page): Promise<void> {
  const extendAds:string[] = [
    '//div[@id="fixedban"]',
    '//div[@id="Ad.Plus-970x250-1"]',
    '//div[@id="Ad.Plus-970x250-2"]',
    '//div[@class="sidebar-content pattern-background shadow widget-divider-off"]',
  ]

  for (const ads of extendAds) {
    let loc: Locator = page.locator(ads)

    await page.waitForLoadState()

    if(await loc.isVisible() ){
      await loc.evaluate((elem: SVGAElement | HTMLBRElement): void => elem.remove())
    }
  }
}

export async function assertByState(
    actual: string | number,
    expected: string | number,
    state: 'match' | 'notMatch' = 'match'
): Promise<void> {
  // выбираем нужный expect: либо обычный, либо с .not
  const assertion: any = state === 'match' ? expect(actual) : expect(actual).not;
  // вызываем toBe на выбранном assertion
  assertion.toBe(expected);
}

export function getParentNameByChildName<T> (obj: {[key: string]: T[]}, value: T): string | undefined {
  for(let key in obj){
    if(obj[key].includes(value)){
      return key
    }
  }
  console.error(`Not found: ${value}`)
  return undefined
}