import { test } from '@playwright/test'
import MainPage from '../page/main.page'
import WebTablesPage from '../page/webTables.page'
import RegistrationModalWindow from "../utils/components/registrationModalWindow";
import NavigationBar from '../utils/components/navigationBar'
import { removeAds } from '../utils/functions'

test.describe('Check the functioning of the "Text Box" section', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let webTablesPage: WebTablesPage
  let registrationModalWindow: RegistrationModalWindow

  const testDataFromCreateUser: { [key: string]: string} = {
    firstName: 'Ivan',
    lastName: 'Ivanov',
    email: 'Ivanovich@gmail.com',
    age: '25',
    salary: '25000',
    department: 'QA'
  }

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    webTablesPage = new WebTablesPage(page)
    navigationBar = new NavigationBar(page)
    registrationModalWindow = new RegistrationModalWindow(page)

    await mainPage.gotoMainPage()
    await removeAds(page)
    await mainPage.gotoCard('Elements')
    await navigationBar.gotoNavBar('Elements', 'Web Tables')
    await removeAds(page)
  })

  test('CASE_1: Проверка функционала открытия-закрытия модального окна.', async () => {
    await test.step(`Нажать кнопку "Add".`, async () => {
      await webTablesPage.clickAddUserButton()
    })

    await test.step(`Проверяем что окно открылось.`, async () => {
      await registrationModalWindow.isModalWindowToBeVisible()
    })

    await test.step(`Нажать кнопку "X".`, async () => {
      await registrationModalWindow.clickCloseModalWindowButton()
    })

    await test.step(`Проверяем что окно закрылось.`, async () => {
      await registrationModalWindow.isModalWindowToBeHidden()
    })
  })

  test('CASE_2: Проверка функционала на заполнение полей ввода в модальном окне.', async () => {
    await test.step(`Preconditions`, async () => {
      await test.step(`Открываем модальное окно`, async () => {
        await webTablesPage.clickAddUserButton()
      })
    })

    await test.step(`Заполняем поле "First Name".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('First Name', testDataFromCreateUser['firstName'])
    })

    await test.step(`Проверяем поле на корректное отображение.`, async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('First Name', testDataFromCreateUser["firstName"])
    })

    await test.step(`Заполняем поле "Last Name".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Last Name', testDataFromCreateUser['lastName'])
    })

    await test.step(`Проверяем поле на корректное отображение.`, async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('Last Name', testDataFromCreateUser['lastName'])
    })

    await test.step(`Заполняем поле "Email".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('name@example.com', testDataFromCreateUser['email'])
    })

    await test.step(`Проверяем поле на корректное отображение.`, async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('name@example.com', testDataFromCreateUser['email'])
    })

    await test.step(`Заполняем поле "Age".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Age', testDataFromCreateUser['age'])
    })

    await test.step(`Проверяем поле на корректное отображение.`, async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('Age', testDataFromCreateUser['age'])
    })

    await test.step(`Заполняем поле "Salary".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Salary', testDataFromCreateUser['salary'])
    })

    await test.step(`Проверяем поле на корректное отображение.`, async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('Salary', testDataFromCreateUser['salary'])
    })

    await test.step(`Заполняем поле "Department".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Department', testDataFromCreateUser['department'])
    })

    await test.step(`Проверяем поле на корректное отображение.`, async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('Department', testDataFromCreateUser['department'])
    })
  })

  test('CASE_3: Проверка функционала некорректный ввод в модальном окне.', async () => {
    await test.step(`Preconditions`, async () => {
      await test.step(`Открываем модальное окно`, async () => {
        await webTablesPage.clickAddUserButton()
      })
    })

    await test.step(`Нажать кнопку "Submit"`, async () => {
      await registrationModalWindow.clickSubmitButtonInModalWindow()
    })

    await test.step(`Проверяем состояние полей.`, async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      await registrationModalWindow.validationInputColorInModalWindow('First Name', 'invalidColor')
    })
  })

  test('CASE_4: Проверка функционала на смену индикации некорректного ввода в модальном окне.', async () => {
    await test.step(`Preconditions`, async () => {
      await test.step(`Открываем модальное окно`, async () => {
        await webTablesPage.clickAddUserButton()
      })

      await test.step(`Нажать кнопку "Submit"`, async () => {
        await registrationModalWindow.clickSubmitButtonInModalWindow()
      })
    })

    await test.step(`Заполняем поле "First Name".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('First Name', testDataFromCreateUser['firstName'])
    })

    await test.step(`Проверяем состояние поля.`, async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      await registrationModalWindow.validationInputColorInModalWindow('First Name', 'validColor')
    })

    await test.step(`Заполняем поле "Last Name".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Last Name', testDataFromCreateUser['lastName'])
    })

    await test.step(`Проверяем состояние поля.`, async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      await registrationModalWindow.validationInputColorInModalWindow('Last Name', 'validColor')
    })

    await test.step(`Заполняем поле "Email".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('name@example.com', testDataFromCreateUser['email'])
    })

    await test.step(`Проверяем состояние поля.`, async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      await registrationModalWindow.validationInputColorInModalWindow('name@example.com', 'validColor')
    })

    await test.step(`Заполняем поле "Age".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Age', testDataFromCreateUser['age'])
    })

    await test.step(`Проверяем состояние поля.`, async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      await registrationModalWindow.validationInputColorInModalWindow('Age', 'validColor')
    })

    await test.step(`Заполняем поле "Salary".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Salary', testDataFromCreateUser['salary'])
    })

    await test.step(`Проверяем состояние поля.`, async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      await registrationModalWindow.validationInputColorInModalWindow('Salary', 'validColor')
    })

    await test.step(`Заполняем поле "Department".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Department', testDataFromCreateUser['department'])
    })

    await test.step(`Проверяем состояние поля.`, async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      await registrationModalWindow.validationInputColorInModalWindow('Department', 'validColor')
    })
  })

  test('CASE_5: Проверка функционала на создание пользователя.', async () => {
    await test.step(`Открываем модальное окно`, async () => {
      await webTablesPage.clickAddUserButton()
    })

    await test.step(`Заполняем поле "First Name".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('First Name', testDataFromCreateUser['firstName'])
    })

    await test.step(`Заполняем поле "Last Name".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Last Name', testDataFromCreateUser['lastName'])
    })

    await test.step(`Заполняем поле "Email".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('name@example.com', testDataFromCreateUser['email'])
    })

    await test.step(`Заполняем поле "Age".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Age', testDataFromCreateUser['age'])
    })

    await test.step(`Заполняем поле "Salary".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Salary', testDataFromCreateUser['salary'])
    })

    await test.step(`Заполняем поле "Department".`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Department', testDataFromCreateUser['department'])
    })

    await test.step(`Нажимаем кнопку "Submit"`, async () => {
      await registrationModalWindow.clickSubmitButtonInModalWindow()
    })

    await test.step(`Получаем и сравниваем данные ячейки имени пользователя`, async () => {
      let currentFirstNameUser = await webTablesPage.getUserData(testDataFromCreateUser['email'], 'firstName')
      await webTablesPage.isUserDataMatch(testDataFromCreateUser['firstName'], currentFirstNameUser)
    })

    await test.step(`Получаем и сравниваем данные ячейки имени пользователя`, async () => {
      let currentFirstNameUser = await webTablesPage.getUserData(testDataFromCreateUser['email'], 'lastName')
      await webTablesPage.isUserDataMatch(testDataFromCreateUser['lastName'], currentFirstNameUser)
    })

    await test.step(`Получаем и сравниваем данные ячейки имени пользователя`, async () => {
      let currentFirstNameUser = await webTablesPage.getUserData(testDataFromCreateUser['email'], 'age')
      await webTablesPage.isUserDataMatch(testDataFromCreateUser['age'], currentFirstNameUser)
    })

    await test.step(`Получаем и сравниваем данные ячейки имени пользователя`, async () => {
      let currentFirstNameUser = await webTablesPage.getUserData(testDataFromCreateUser['email'], 'email')
      await webTablesPage.isUserDataMatch(testDataFromCreateUser['email'], currentFirstNameUser)
    })

    await test.step(`Получаем и сравниваем данные ячейки имени пользователя`, async () => {
      let currentFirstNameUser = await webTablesPage.getUserData(testDataFromCreateUser['email'], 'salary')
      await webTablesPage.isUserDataMatch(testDataFromCreateUser['salary'], currentFirstNameUser)
    })

    await test.step(`Получаем и сравниваем данные ячейки имени пользователя`, async () => {
      let currentFirstNameUser = await webTablesPage.getUserData(testDataFromCreateUser['email'], 'department')
      await webTablesPage.isUserDataMatch(testDataFromCreateUser['department'], currentFirstNameUser)
    })
  })

  // test('CASE_6: Проверка функционала поиска в таблице.', async () => {
  //   await test.step(`Открываем модальное окно`, async () => {
  //     await webTablesPage.fillSearchInput('Cierra')
  //   })
  //
  //   await test.step(`Проверяем результат поиска`, async () => {
  //     await webTablesPage.isUserDataMatch('Cierra', 'Cantrell', 1)
  //   })
  // })
})