import {Page} from "@playwright/test"
import {NavigationBarStructure} from "../types";
import {getParentNameByChildName} from "../functions";

export default class NavigationBar {
  page: Page

  navigationBarStructure: NavigationBarStructure = {
    'Elements': ['Text Box','Check Box','Radio Button','Web Tables','Buttons','Links','Broken Links - Images','Upload and Download','Dynamic Properties'],
    'Forms': ['Practice Form'],
    'Alerts, Frame & Windows': ['Browser Windows','Alerts','Frames','Nested Frames','Modal Dialogs'],
    'Widgets': ['Accordian','Auto Complete','Date Picker','Slider','Progress Bar','Tabs','Tool Tips','Menu','Select Menu'],
    'Interactions': ['Sortable','Selectable','Resizable','Droppable','Dragabble'],
    'Book Store Application': ['Login','Book Store','Profile','Book Store API']
  }

  constructor(page: Page) {
    this.page = page
  }

async clickElementInNavigationBar(childElementName: string): Promise<void> {
    const parentElementName: string | undefined = getParentNameByChildName(this.navigationBarStructure, childElementName)

  if(typeof parentElementName !== 'string' ){
    throw new Error(`Не найден родительский элемент для "${childElementName}"`)
  }

    await this.page.locator(`
    //div[text()= "${parentElementName}"]/ancestor::div[2]
    //span[text()= "${childElementName}"]`).click()
  }
}