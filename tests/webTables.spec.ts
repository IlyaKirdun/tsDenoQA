import { test } from '@playwright/test'
import MainPage from '../page/main.page'
import WebTablesPage from '../page/webTables.page'
import RegistrationModalWindow from "../utils/components/registrationModalWindow";
import NavigationBar from '../utils/components/navigationBar'
import { removeAds } from '../utils/functions'

test.describe('Проверка функциональности на странице "Web Tables', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let webTablesPage: WebTablesPage
  let registrationModalWindow: RegistrationModalWindow

  const testDataForCreateUser: { [key: string]: string} = {
    firstName: 'Ivan',
    lastName: 'Ivanov',
    email: 'Ivanovich@gmail.com',
    age: '25',
    salary: '25000',
    department: 'QA'
  }

  const testDataExistingUser: { [key: string]: string} = {
    firstName: 'Cierra',
    lastName: 'Vega',
    age: '39',
    email: 'cierra@example.com',
    salary: '10000',
    department: 'Insurance'
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

  test('CASE_1: Проверка функционала открытия и закрытия модального окна.', async () => {
    await test.step('Нажать кнопку "Add".', async () => {
      await webTablesPage.clickAddUserButton()
    })

    await test.step('Проверяем что модальное окно открылось.', async () => {
      await registrationModalWindow.isModalWindowToBeVisible()
    })

    await test.step('Нажать кнопку "X".', async () => {
      await registrationModalWindow.clickCloseModalWindowButton()
    })

    await test.step('Проверяем что модальное окно закрылось.', async () => {
      await registrationModalWindow.isModalWindowToBeHidden()
    })
  })

  test(`CASE_2: Проверка функционала на заполнение полей ввода:
    First Name, Last Name, Email, Age, Salary, Department.`, async () => {
    await test.step('Preconditions', async () => {
      await test.step('Нажимаем кнопку "Add"', async () => {
        await webTablesPage.clickAddUserButton()
      })
    })

    await test.step('Проверяем что модальное окно открылось.', async () => {
      await registrationModalWindow.isModalWindowToBeVisible()
    })

    await test.step(`Заполняем поле "First Name", вводим ${testDataForCreateUser['firstName']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('First Name', testDataForCreateUser['firstName'])
    })

    await test.step('Проверяем поле "First Name" на корректное отображение.', async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('First Name', testDataForCreateUser["firstName"])
    })

    await test.step(`Заполняем поле "Last Name", вводим ${testDataForCreateUser['lastName']}`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Last Name', testDataForCreateUser['lastName'])
    })

    await test.step('Проверяем поле "Last Name" на корректное отображение.', async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('Last Name', testDataForCreateUser['lastName'])
    })

    await test.step(`Заполняем поле "Email", вводим ${testDataForCreateUser['email']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('name@example.com', testDataForCreateUser['email'])
    })

    await test.step('Проверяем поле "Email" на корректное отображение.', async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('name@example.com', testDataForCreateUser['email'])
    })

    await test.step(`Заполняем поле "Age", вводим ${testDataForCreateUser['age']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Age', testDataForCreateUser['age'])
    })

    await test.step('Проверяем поле "Age" на корректное отображение.', async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('Age', testDataForCreateUser['age'])
    })

    await test.step(`Заполняем поле "Salary", вводим ${testDataForCreateUser['salary']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Salary', testDataForCreateUser['salary'])
    })

    await test.step('Проверяем поле "Salary" на корректное отображение.', async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('Salary', testDataForCreateUser['salary'])
    })

    await test.step(`Заполняем поле "Department", вводим ${testDataForCreateUser['department']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Department', testDataForCreateUser['department'])
    })

    await test.step('Проверяем поле "Department" на корректное отображение.', async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('Department', testDataForCreateUser['department'])
    })
  })

  test('CASE_3: Проверка функционала на некорректный ввод в модальном окне.', async () => {
    await test.step('Preconditions', async () => {
      await test.step('Нажимаем кнопку "Add"', async () => {
        await webTablesPage.clickAddUserButton()
      })
    })

    await test.step('Нажать кнопку "Submit"', async () => {
      await registrationModalWindow.clickSubmitButtonInModalWindow()
    })

    await test.step('Проверяем индикацию полей при некорректном вводе.', async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      await registrationModalWindow.validationInputColorInModalWindow('First Name', 'invalidColor')
    })
  })

  test('CASE_4: Проверка функционала на смену индикации некорректного ввода в модальном окне.', async () => {
    await test.step('Preconditions', async () => {
      await test.step('Нажать кнопку "Add".', async () => {
        await webTablesPage.clickAddUserButton()
      })

      await test.step('Нажать кнопку "Submit"', async () => {
        await registrationModalWindow.clickSubmitButtonInModalWindow()
      })

      await test.step('Проверяем индикацию полей', async () => {
        await new Promise(resolve => setTimeout(resolve, 500))
        await registrationModalWindow.validationInputColorInModalWindow('First Name', 'invalidColor')
      })
    })

    await test.step(`Заполняем поле "First Name", вводим ${testDataForCreateUser['firstName']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('First Name', testDataForCreateUser['firstName'])
    })

    await test.step('Проверяем поле "First Name" на изменение состояния ввода.', async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      await registrationModalWindow.validationInputColorInModalWindow('First Name', 'validColor')
    })

    await test.step(`Заполняем поле "Last Name", вводим ${testDataForCreateUser['lastName']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Last Name', testDataForCreateUser['lastName'])
    })

    await test.step('Проверяем поле "Last Name" на изменение состояния ввода.', async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      await registrationModalWindow.validationInputColorInModalWindow('Last Name', 'validColor')
    })

    await test.step(`Заполняем поле "Email", вводим ${testDataForCreateUser['email']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('name@example.com', testDataForCreateUser['email'])
    })

    await test.step('Проверяем поле "Email" на изменение состояния ввода.', async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      await registrationModalWindow.validationInputColorInModalWindow('name@example.com', 'validColor')
    })

    await test.step(`Заполняем поле "Age", вводим ${testDataForCreateUser['age']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Age', testDataForCreateUser['age'])
    })

    await test.step('Проверяем поле "Age" на изменение состояния ввода.', async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      await registrationModalWindow.validationInputColorInModalWindow('Age', 'validColor')
    })

    await test.step(`Заполняем поле "Salary", вводим ${testDataForCreateUser['salary']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Salary', testDataForCreateUser['salary'])
    })

    await test.step('Проверяем поле "Salary" на изменение состояния ввода.', async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      await registrationModalWindow.validationInputColorInModalWindow('Salary', 'validColor')
    })

    await test.step(`Заполняем поле "Department", вводим ${testDataForCreateUser['department']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Department', testDataForCreateUser['department'])
    })

    await test.step('Проверяем поле "Department" на изменение состояния ввода.', async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      await registrationModalWindow.validationInputColorInModalWindow('Department', 'validColor')
    })
  })

  test('CASE_5: Проверка функционала на создание пользователя.', async () => {
    await test.step('Нажимаем кнопку "Add".', async () => {
      await webTablesPage.clickAddUserButton()
    })

    await test.step(`Заполняем поле "First Name", вводим ${testDataForCreateUser['firstName']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('First Name', testDataForCreateUser['firstName'])
    })

    await test.step(`Заполняем поле "Last Name", вводим ${testDataForCreateUser['lastName']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Last Name', testDataForCreateUser['lastName'])
    })

    await test.step(`Заполняем поле "Email", вводим ${testDataForCreateUser['email']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('name@example.com', testDataForCreateUser['email'])
    })

    await test.step(`Заполняем поле "Age", вводим ${testDataForCreateUser['age']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Age', testDataForCreateUser['age'])
    })

    await test.step(`Заполняем поле "Salary", вводим ${testDataForCreateUser['salary']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Salary', testDataForCreateUser['salary'])
    })

    await test.step(`Заполняем поле "Department", вводим ${testDataForCreateUser['department']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Department', testDataForCreateUser['department'])
    })

    await test.step('Нажимаем кнопку "Submit"', async () => {
      await registrationModalWindow.clickSubmitButtonInModalWindow()
    })

    await test.step(`Получаем данные ячейки "First Name" и сверяем с ${testDataForCreateUser['firstName']}.`, async () => {
      let currentFirstNameUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'firstName')
      await webTablesPage.isUserDataMatch(testDataForCreateUser['firstName'], currentFirstNameUser)
    })

    await test.step(`Получаем данные ячейки "Last Name" и сверяем с ${testDataForCreateUser['lastName']}.`, async () => {
      let currentLastNameUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'lastName')
      await webTablesPage.isUserDataMatch(testDataForCreateUser['lastName'], currentLastNameUser)
    })

    await test.step(`Получаем данные ячейки "Age" и сверяем с ${testDataForCreateUser['age']}.`, async () => {
      let currentAgeUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'age')
      await webTablesPage.isUserDataMatch(testDataForCreateUser['age'], currentAgeUser)
    })

    await test.step(`Получаем данные ячейки "Email" и сверяем с ${testDataForCreateUser['email']}.`, async () => {
      let currentEmailUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'email')
      await webTablesPage.isUserDataMatch(testDataForCreateUser['email'], currentEmailUser)
    })

    await test.step(`Получаем данные ячейки "Salary" и сверяем с ${testDataForCreateUser['salary']}.`, async () => {
      let currentSalaryUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'salary')
      await webTablesPage.isUserDataMatch(testDataForCreateUser['salary'], currentSalaryUser)
    })

    await test.step(`Получаем данные ячейки "Department" и сверяем с ${testDataForCreateUser['department']}.`, async () => {
      let currentDepartmentUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'department')
      await webTablesPage.isUserDataMatch(testDataForCreateUser['department'], currentDepartmentUser)
    })
  })

  test('CASE_6: Проверка функционала поиска в таблице.', async () => {
    await test.step(`Заполняем в поле поиска - email пользователя из ${testDataExistingUser['email']}.`, async () => {
      await webTablesPage.fillSearchInput(testDataExistingUser['email'])
    })

    await test.step('Проверяем результат поиска.', async () => {
      let currentEmailUser = await webTablesPage.getUserData(testDataExistingUser['email'], 'email')
      await webTablesPage.isUserDataMatch(testDataExistingUser['email'], currentEmailUser)
    })
  })
})