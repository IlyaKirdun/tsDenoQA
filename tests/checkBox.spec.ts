import { test } from '@playwright/test'
import MainPage from '../page/main.page'
import CheckBoxPage from '../page/checkBox.page'
import NavigationBar from '../utils/components/navigationBar'
import { removeAds } from '../utils/functions'

test.describe('Check the functioning of the "Text Box" section', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let checkBoxPage: CheckBoxPage

  const foldersExpandName: string[]= [
    'Home',
    'Documents',
    'WorkSpace'
  ]

  const testDataOfAllFiles = [
    'home','desktop','notes','commands',
    'documents','workspace','react','angular',
    'veu','office','public','private','classified',
    'general','downloads','wordFile','excelFile'
  ]

  const testDataOfOneFolder = [
    'desktop',
    'notes',
    'commands'
  ]

  const testDataOfSeveralFiles = [
    'notes',
    'react',
    'public',
    'wordFile'
  ]

  const testDataForClickOfSeveralFiles = [
    'Notes',
    'React',
    'Public',
    'Word File.doc'
  ]

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    checkBoxPage = new CheckBoxPage(page)
    navigationBar = new NavigationBar(page)

    await mainPage.gotoMainPage()
    await removeAds(page)
    await mainPage.gotoCard('Elements')
    await navigationBar.gotoNavBar('Elements', 'Check Box')
    await removeAds(page)
  })

  test('CASE_1: Verify expand folders on page', async () => {
    await test.step(`Click on expand button in ${foldersExpandName} folders`, async () => {
      for(let elementName of foldersExpandName){
        await checkBoxPage.clickExpandButtonFolderName(elementName)
      }
    })

    await test.step(`Check changed state buttons`, async () => {
      for(let elementName of foldersExpandName){
        await checkBoxPage.isExpandButtonChangedState(elementName, 'toBeVisible')
      }
    })

    await test.step(`Post-condition`, async () => {
      await test.step(`Click collapse button "-"`, async () => {
        await checkBoxPage.clickExpandOrCollapseAllFoldersButton('Collapse all')
      })
    })
  })

  test('CASE_2: Checking the Deployment Status on page', async () => {
    await test.step(`Precondition`, async () => {
      await test.step(`Click on expand button in ${foldersExpandName} folders`, async () => {
        for(let folderName of foldersExpandName){
          await checkBoxPage.clickExpandButtonFolderName(folderName)
        }
      })
    })

    await test.step(`Click on collapse button folder "Home"`, async () => {
      await checkBoxPage.clickExpandButtonFolderName('Home')
    })

    await test.step(`Click on expand button folder "Home"`, async () => {
      await checkBoxPage.clickExpandButtonFolderName('Home')
    })

    await test.step(`Check changed state buttons`, async () => {
      for(let elementName of foldersExpandName){
        await checkBoxPage.isExpandButtonChangedState(elementName, 'toBeVisible')
      }
    })

    await test.step(`Post-condition`, async () => {
      await test.step(`Click collapse button "-"`, async () => {
        await checkBoxPage.clickExpandOrCollapseAllFoldersButton('Collapse all')
      })
    })
  })

  test('CASE_3: Verify on select directory in one click', async () => {
    await test.step(`Precondition`, async () => {
      await test.step(`Click collapse button "+"`, async () => {
        await checkBoxPage.clickExpandOrCollapseAllFoldersButton('Expand all')
      })
    })

    await test.step(`Click on checkbox folder "Home"`, async () => {
      await checkBoxPage.clickCheckboxButtonElementName(['Home'])
    })

    await test.step(`Checking the output of the selected files`, async () => {
      await checkBoxPage.isDataMatch(testDataOfAllFiles)
    })

    await test.step(`Post-conditions`, async () => {
      await test.step(`Click on the "home" flag to reset the state`, async () => {
        await checkBoxPage.clickCheckboxButtonElementName(['Home'])
      })

      await test.step(`Click collapse button "-"`, async () => {
        await checkBoxPage.clickExpandOrCollapseAllFoldersButton('Collapse all')
      })
    })
  })

  test('CASE_4: Verify on select directory in one click', async () => {
    await test.step(`Precondition`, async () => {
      await test.step(`Click collapse button "+"`, async () => {
        await checkBoxPage.clickExpandOrCollapseAllFoldersButton('Expand all')
      })
    })

    await test.step(`Click on checkbox folder "Desktop"`, async () => {
      await checkBoxPage.clickCheckboxButtonElementName(['Desktop'])
    })

    await test.step(`Checking the output of the selected files`, async () => {
      await checkBoxPage.isDataMatch(testDataOfOneFolder)
    })

    await test.step(`Post-conditions`, async () => {
      await test.step(`Click on the "home" flag to reset the state`, async () => {
        await checkBoxPage.clickCheckboxButtonElementName(['Home'])
      })

      await test.step(`Click on the "home" flag to reset the state`, async () => {
        await checkBoxPage.clickCheckboxButtonElementName(['Home'])
      })

      await test.step(`Click collapse button "-"`, async () => {
        await checkBoxPage.clickExpandOrCollapseAllFoldersButton('Collapse all')
      })
    })
  })

  test('CASE_5: Verify the selection of the root directory folder,' +
        'selecting the files inside this folder', async () => {
    await test.step(`Precondition`, async () => {
      await test.step(`Click collapse button "+"`, async () => {
        await checkBoxPage.clickExpandOrCollapseAllFoldersButton('Expand all')
      })
    })

    await test.step(`Click on checkbox files: notes, react, public, wordFile`, async () => {
      for(let fileName of testDataForClickOfSeveralFiles){
        await checkBoxPage.clickCheckboxButtonElementName([fileName])
      }
    })

    await test.step(`Checking the output of the selected files`, async () => {
      await checkBoxPage.isDataMatch(testDataOfSeveralFiles)
    })

    await test.step(`Post-conditions`, async () => {
      await test.step(`Click collapse button "-"`, async () => {
        await checkBoxPage.clickExpandOrCollapseAllFoldersButton('Collapse all')
      })

      await test.step(`Click on the "home" flag to reset the state`, async () => {
        await checkBoxPage.clickCheckboxButtonElementName(['Home'])
      })

      await test.step(`Click on the "home" flag to reset the state`, async () => {
        await checkBoxPage.clickCheckboxButtonElementName(['Home'])
      })
    })
  })
})