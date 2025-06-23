import { test } from '@playwright/test'
import MainPage from '../page/main.page'
import WebTablesPage from '../page/webTables.page'
import RegistrationModalWindow from "../utils/components/registrationModalWindow";
import NavigationBar from '../utils/components/navigationBar'
import { removeAds, assertByState } from '../utils/functions'
import {SelectingAmountRows} from "../utils/types";

test.describe('Проверка функциональности на странице "Web Tables', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let webTablesPage: WebTablesPage
  let registrationModalWindow: RegistrationModalWindow

  let initialPage: string = ''
  let initialUserEmail: string = ''

  const testDataForCreateUser: { [key: string]: string } = {
    firstName: 'Ivan',
    lastName: 'Ivanov',
    userEmail: 'Ivanovich@gmail.com',
    age: '25',
    salary: '25000',
    department: 'QA'
  }

  const testDataExistingUser: { [key: string]: string } = {
    firstName: 'Cierra',
    lastName: 'Vega',
    age: '39',
    userEmail: 'cierra@example.com',
    salary: '10000',
    department: 'Insurance'
  }

  const firstUserBeforeSorting: { [key: string]: string } = {
    firstName: '',
    lastName: '',
    age: '',
    userEmail: '',
    salary: '',
    department: ''
  }

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    webTablesPage = new WebTablesPage(page)
    navigationBar = new NavigationBar(page)
    registrationModalWindow = new RegistrationModalWindow(page)

    await mainPage.navigateToMainPage()
    await removeAds(page)
    await mainPage.clickOnElement('Elements')
    await navigationBar.clickElementInNavigationBar('Web Tables')
    await removeAds(page)
  })

  test('CASE_1: Проверка функционала открытия и закрытия модального окна.', async () => {
    await test.step('Нажать кнопку "Add".', async () => {
      await webTablesPage.clickAddUserButton()
    })

    await test.step('Проверяем что модальное окно открылось.', async () => {
      await registrationModalWindow.checkVisibilityByState('toBeVisible')
    })

    await test.step('Нажать кнопку "X".', async () => {
      await registrationModalWindow.clickCloseModalWindowButton()
    })

    await test.step('Проверяем что модальное окно закрылось.', async () => {
      await registrationModalWindow.checkVisibilityByState('toBeHidden')
    })
  })

  test(`CASE_2: Проверка функционала на заполнение полей ввода:
    First Name, Last Name, Email, Age, Salary, Department.`, async () => {
    await test.step('Pre-conditions', async () => {
      await test.step('Нажимаем кнопку "Add"', async () => {
        await webTablesPage.clickAddUserButton()
      })

      await test.step('Проверяем что модальное окно открылось.', async () => {
        await registrationModalWindow.checkVisibilityByState('toBeVisible')
      })
    })

    await test.step(`Заполняем поле "First Name", вводим ${testDataForCreateUser['firstName']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('firstName', testDataForCreateUser['firstName'])
    })

    await test.step('Проверяем поле "First Name" на корректное отображение.', async () => {
      await registrationModalWindow.verifyEnteredData('firstName', testDataForCreateUser['firstName'])
    })

    await test.step(`Заполняем поле "Last Name", вводим ${testDataForCreateUser['lastName']}`, async () => {
      await registrationModalWindow.fillInputDataByInputName('lastName', testDataForCreateUser['lastName'])
    })

    await test.step('Проверяем поле "Last Name" на корректное отображение.', async () => {
      await registrationModalWindow.verifyEnteredData('lastName', testDataForCreateUser['lastName'])
    })

    await test.step(`Заполняем поле "Email", вводим ${testDataForCreateUser['userEmail']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('userEmail', testDataForCreateUser['userEmail'])
    })

    await test.step('Проверяем поле "Email" на корректное отображение.', async () => {
      await registrationModalWindow.verifyEnteredData('userEmail', testDataForCreateUser['userEmail'])
    })

    await test.step(`Заполняем поле "Age", вводим ${testDataForCreateUser['age']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('age', testDataForCreateUser['age'])
    })

    await test.step('Проверяем поле "Age" на корректное отображение.', async () => {
      await registrationModalWindow.verifyEnteredData('age', testDataForCreateUser['age'])
    })

    await test.step(`Заполняем поле "Salary", вводим ${testDataForCreateUser['salary']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('salary', testDataForCreateUser['salary'])
    })

    await test.step('Проверяем поле "Salary" на корректное отображение.', async () => {
      await registrationModalWindow.verifyEnteredData('salary', testDataForCreateUser['salary'])
    })

    await test.step(`Заполняем поле "Department", вводим ${testDataForCreateUser['department']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('department', testDataForCreateUser['department'])
    })

    await test.step('Проверяем поле "Department" на корректное отображение.', async () => {
      await registrationModalWindow.verifyEnteredData('department', testDataForCreateUser['department'])
    })
  })

  test('CASE_3: Проверка функционала на некорректный ввод в модальном окне.', async () => {
    await test.step('Preconditions', async () => {
      await test.step('Нажимаем кнопку "Add"', async () => {
        await webTablesPage.clickAddUserButton()
      })

      await test.step('Нажать кнопку "Submit"', async () => {
        await registrationModalWindow.clickSubmitButtonInModalWindow()
      })
    })

    await test.step('Проверяем индикацию поля "First Name" при некорректном вводе.', async () => {
      await registrationModalWindow.verifyInputColorByState('firstName', 'invalid')
    })

    await test.step('Проверяем индикацию поля "Last Name" при некорректном вводе.', async () => {
      await registrationModalWindow.verifyInputColorByState('lastName', 'invalid')
    })

    await test.step('Проверяем индикацию поля "Email" при некорректном вводе.', async () => {
      await registrationModalWindow.verifyInputColorByState('userEmail', 'invalid')
    })

    await test.step('Проверяем индикацию поля "Age" при некорректном вводе.', async () => {
      await registrationModalWindow.verifyInputColorByState('age', 'invalid')
    })

    await test.step('Проверяем индикацию поля "Salary" при некорректном вводе.', async () => {
      await registrationModalWindow.verifyInputColorByState('salary', 'invalid')
    })

    await test.step('Проверяем индикацию поля "Department" при некорректном вводе.', async () => {
      await registrationModalWindow.verifyInputColorByState('department', 'invalid')
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
        await registrationModalWindow.verifyInputColorByState('firstName', 'invalid')
      })
    })

    await test.step(`Заполняем поле "First Name", вводим ${testDataForCreateUser['firstName']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('firstName', testDataForCreateUser['firstName'])
    })

    await test.step('Проверяем поле "First Name" на изменение состояния ввода.', async () => {
      await registrationModalWindow.verifyInputColorByState('firstName', 'valid')
    })

    await test.step(`Заполняем поле "Last Name", вводим ${testDataForCreateUser['lastName']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('lastName', testDataForCreateUser['lastName'])
    })

    await test.step('Проверяем поле "Last Name" на изменение состояния ввода.', async () => {
      await registrationModalWindow.verifyInputColorByState('lastName', 'valid')
    })

    await test.step(`Заполняем поле "Email", вводим ${testDataForCreateUser['email']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('userEmail', testDataForCreateUser['userEmail'])
    })

    await test.step('Проверяем поле "Email" на изменение состояния ввода.', async () => {
      await registrationModalWindow.verifyInputColorByState('userEmail', 'valid')
    })

    await test.step(`Заполняем поле "Age", вводим ${testDataForCreateUser['age']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('age', testDataForCreateUser['age'])
    })

    await test.step('Проверяем поле "Age" на изменение состояния ввода.', async () => {
      await registrationModalWindow.verifyInputColorByState('age', 'valid')
    })

    await test.step(`Заполняем поле "Salary", вводим ${testDataForCreateUser['salary']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('salary', testDataForCreateUser['salary'])
    })

    await test.step('Проверяем поле "Salary" на изменение состояния ввода.', async () => {
      await registrationModalWindow.verifyInputColorByState('salary', 'valid')
    })

    await test.step(`Заполняем поле "Department", вводим ${testDataForCreateUser['department']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('department', testDataForCreateUser['department'])
    })

    await test.step('Проверяем поле "Department" на изменение состояния ввода.', async () => {
      await registrationModalWindow.verifyInputColorByState('department', 'valid')
    })
  })

  test('CASE_5: Проверка функционала на создание пользователя.', async () => {
    const userEmail: string[] = [testDataForCreateUser['userEmail']]

    await test.step('Нажимаем кнопку "Add".', async () => {
      await webTablesPage.clickAddUserButton()
    })

    await test.step(`Заполняем поле "First Name", вводим ${testDataForCreateUser['firstName']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('firstName', testDataForCreateUser['firstName'])
    })

    await test.step(`Заполняем поле "Last Name", вводим ${testDataForCreateUser['lastName']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('lastName', testDataForCreateUser['lastName'])
    })

    await test.step(`Заполняем поле "Email", вводим ${testDataForCreateUser['userEmail']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('userEmail', testDataForCreateUser['userEmail'])
    })

    await test.step(`Заполняем поле "Age", вводим ${testDataForCreateUser['age']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('age', testDataForCreateUser['age'])
    })

    await test.step(`Заполняем поле "Salary", вводим ${testDataForCreateUser['salary']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('salary', testDataForCreateUser['salary'])
    })

    await test.step(`Заполняем поле "Department", вводим ${testDataForCreateUser['department']}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('department', testDataForCreateUser['department'])
    })

    await test.step('Нажимаем кнопку "Submit"', async () => {
      await registrationModalWindow.clickSubmitButtonInModalWindow()
    })

    await test.step(`Получаем данные ячейки "First Name" и сверяем с ${testDataForCreateUser['firstName']}.`, async () => {
      let currentFirstNameUser = await webTablesPage.getUserData(testDataForCreateUser['userEmail'], 'firstName')
      await assertByState(testDataForCreateUser['firstName'], currentFirstNameUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Last Name" и сверяем с ${testDataForCreateUser['lastName']}.`, async () => {
      let currentLastNameUser = await webTablesPage.getUserData(testDataForCreateUser['userEmail'], 'lastName')
      await assertByState(testDataForCreateUser['lastName'], currentLastNameUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Age" и сверяем с ${testDataForCreateUser['age']}.`, async () => {
      let currentAgeUser = await webTablesPage.getUserData(testDataForCreateUser['userEmail'], 'age')
      await assertByState(testDataForCreateUser['age'], currentAgeUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Email" и сверяем с ${testDataForCreateUser['userEmail']}.`, async () => {
      let currentEmailUser = await webTablesPage.getUserData(testDataForCreateUser['userEmail'], 'userEmail')
      await assertByState(testDataForCreateUser['userEmail'], currentEmailUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Salary" и сверяем с ${testDataForCreateUser['salary']}.`, async () => {
      let currentSalaryUser = await webTablesPage.getUserData(testDataForCreateUser['userEmail'], 'salary')
      await assertByState(testDataForCreateUser['salary'], currentSalaryUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Department" и сверяем с ${testDataForCreateUser['department']}.`, async () => {
      let currentDepartmentUser = await webTablesPage.getUserData(testDataForCreateUser['userEmail'], 'department')
      await assertByState(testDataForCreateUser['department'], currentDepartmentUser, 'match')
    })

    await test.step('Post-condition', async () => {
      await test.step('Удаляем пользователя', async () => {
        await webTablesPage.deleteAddedUsers(userEmail)
      })
    })
  })

  test('CASE_6: Проверка функционала поиска в таблице.', async () => {
    await test.step(`Заполняем в поле поиска - email пользователя из ${testDataExistingUser['userEmail']}.`, async () => {
      await webTablesPage.fillSearchInput(testDataExistingUser['userEmail'])
    })

    await test.step('Проверяем результат поиска.', async () => {
      let currentEmailUser = await webTablesPage.getUserData(testDataExistingUser['userEmail'], 'userEmail')
      await assertByState(testDataExistingUser['userEmail'], currentEmailUser, 'match')
    })
  })

  test('CASE_7: Проверка функционала сортировки в таблице.', async () => {
    await test.step('Сохраняем "First Name" пользователя из первой строки.', async () => {
      firstUserBeforeSorting['firstName'] = await webTablesPage.getFirstUserData('firstName')
    })

    await test.step('Нажимаем ячейку сортировки "First Name".', async () => {
      await webTablesPage.clickOnSortingCell('firstName')
    })

    await test.step('Сравниваем текущего пользователя в первой строке, с сохраненным.', async () => {
      const currentUserAfterSorting = await webTablesPage.getFirstUserData('firstName')
      await assertByState(firstUserBeforeSorting['firstName'], currentUserAfterSorting, 'notMatch')
    })

    await test.step('Сохраняем "Last Name" пользователя из первой строки.', async () => {
      firstUserBeforeSorting['lastName'] = await webTablesPage.getFirstUserData('lastName')
    })

    await test.step('Нажимаем ячейку сортировки "Last Name".', async () => {
      await webTablesPage.clickOnSortingCell('lastName')
    })

    await test.step('Сравниваем текущего пользователя в первой строке, с сохраненным.', async () => {
      const currentUserAfterSorting = await webTablesPage.getFirstUserData('lastName')
      await assertByState(firstUserBeforeSorting['lastName'], currentUserAfterSorting, 'notMatch')
    })

    await test.step('Сохраняем "Age" пользователя из первой строки.', async () => {
      firstUserBeforeSorting['age'] = await webTablesPage.getFirstUserData('age')
    })

    await test.step('Нажимаем ячейку сортировки "Age".', async () => {
      await webTablesPage.clickOnSortingCell('age')
    })

    await test.step('Сравниваем текущего пользователя в первой строке, с сохраненным.', async () => {
      const currentUserAfterSorting = await webTablesPage.getFirstUserData('age')
      await assertByState(firstUserBeforeSorting['age'], currentUserAfterSorting, 'notMatch')
    })

    await test.step('Сохраняем "Email" пользователя из первой строки.', async () => {
      firstUserBeforeSorting['userEmail'] = await webTablesPage.getFirstUserData('userEmail')
    })

    await test.step('Нажимаем ячейку сортировки "Email".', async () => {
      await webTablesPage.clickOnSortingCell('userEmail')
    })

    await test.step('Сравниваем текущего пользователя в первой строке, с сохраненным.', async () => {
      const currentUserAfterSorting = await webTablesPage.getFirstUserData('userEmail')
      await assertByState(firstUserBeforeSorting['userEmail'], currentUserAfterSorting, 'notMatch')
    })

    await test.step('Сохраняем "Salary" пользователя из первой строки.', async () => {
      firstUserBeforeSorting['salary'] = await webTablesPage.getFirstUserData('salary')
    })

    await test.step('Нажимаем ячейку сортировки "Salary".', async () => {
      await webTablesPage.clickOnSortingCell('salary')
    })

    await test.step('Сравниваем текущего пользователя в первой строке, с сохраненным.', async () => {
      const currentUserAfterSorting = await webTablesPage.getFirstUserData('salary')
      await assertByState(firstUserBeforeSorting['salary'], currentUserAfterSorting, 'notMatch')
    })

    await test.step('Сохраняем "Department" пользователя из первой строки.', async () => {
      firstUserBeforeSorting['department'] = await webTablesPage.getFirstUserData('department')
    })

    await test.step('Нажимаем ячейку сортировки "Department".', async () => {
      await webTablesPage.clickOnSortingCell('department')
    })

    await test.step('Сравниваем текущего пользователя в первой строке, с сохраненным.', async () => {
      const currentUserAfterSorting = await webTablesPage.getFirstUserData('department')
      await assertByState(firstUserBeforeSorting['department'], currentUserAfterSorting, 'notMatch')
    })
  })

  test('CASE_8: Проверка функционала редактирования пользователя', async () => {
    let userEmail: string = ''

    await test.step('Precondition.', async () => {
      await test.step('Подготавливаем пользователя', async () => {
        userEmail = await webTablesPage.addUser()
      })
    })

    await test.step(`Нажимаем на кнопку "Edit" у пользователя с email ${userEmail}.`, async () => {
      await webTablesPage.clickUsersActionButtonByUserEmail('Edit', userEmail)
    })

    await test.step('Проверяем что модальное окно отображается.', async () => {
      await registrationModalWindow.checkVisibilityByState('toBeVisible')
    })

    await test.step(`Изменяем в поле "First Name" значение на firstName из ${testDataForCreateUser}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('firstName', testDataForCreateUser['firstName'])
    })

    await test.step(`Проверяем что поле "First Name" заполнено значением ${testDataForCreateUser['firstName']}.`, async () => {
      await registrationModalWindow.verifyEnteredData('firstName', testDataForCreateUser['firstName'])
    })

    await test.step(`Изменяем в поле "Last Name" значение на lastName из ${testDataForCreateUser}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('lastName', testDataForCreateUser['lastName'])
    })

    await test.step(`Проверяем что поле "Last Name" заполнено значением ${testDataForCreateUser['lastName']}.`, async () => {
      await registrationModalWindow.verifyEnteredData('lastName', testDataForCreateUser['lastName'])
    })

    await test.step(`Изменяем в поле "Email" значение на email из ${testDataForCreateUser}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('userEmail', testDataForCreateUser['userEmail'])
    })

    await test.step(`Проверяем что поле "Email" заполнено значением ${testDataForCreateUser['userEmail']}.`, async () => {
      await registrationModalWindow.verifyEnteredData('userEmail', testDataForCreateUser['userEmail'])
    })

    await test.step(`Изменяем в поле "Age" значение на age из ${testDataForCreateUser}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('age', testDataForCreateUser['age'])
    })

    await test.step(`Проверяем что поле "Age" заполнено значением ${testDataForCreateUser['age']}.`, async () => {
      await registrationModalWindow.verifyEnteredData('age', testDataForCreateUser['age'])
    })

    await test.step(`Изменяем в поле "Salary" значение на salary из ${testDataForCreateUser}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('salary', testDataForCreateUser['salary'])
    })

    await test.step(`Проверяем что поле "Salary" заполнено значением ${testDataForCreateUser['salary']}.`, async () => {
      await registrationModalWindow.verifyEnteredData('salary', testDataForCreateUser['salary'])
    })

    await test.step(`Изменяем в поле "Department" значение на department из ${testDataForCreateUser}.`, async () => {
      await registrationModalWindow.fillInputDataByInputName('department', testDataForCreateUser['department'])
    })

    await test.step(`Проверяем что поле "Department" заполнено значением ${testDataForCreateUser['department']}.`, async () => {
      await registrationModalWindow.verifyEnteredData('department', testDataForCreateUser['department'])
    })

    await test.step('Нажимаем кнопку "Submit".', async () => {
      await registrationModalWindow.clickSubmitButtonInModalWindow()
    })

    await test.step('Проверяем что модальное окно закрылось.', async () => {
      await registrationModalWindow.checkVisibilityByState('toBeHidden')
    })

    await test.step(`Получаем данные ячейки "First Name" и сверяем с ${testDataForCreateUser['firstName']}.`, async () => {
      let currentFirstNameUser = await webTablesPage.getUserData(testDataForCreateUser['userEmail'], 'firstName')
      await assertByState(testDataForCreateUser['firstName'], currentFirstNameUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Last Name" и сверяем с ${testDataForCreateUser['lastName']}.`, async () => {
      let currentLastNameUser = await webTablesPage.getUserData(testDataForCreateUser['userEmail'], 'lastName')
      await assertByState(testDataForCreateUser['lastName'], currentLastNameUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Age" и сверяем с ${testDataForCreateUser['age']}.`, async () => {
      let currentAgeUser = await webTablesPage.getUserData(testDataForCreateUser['userEmail'], 'age')
      await assertByState(testDataForCreateUser['age'], currentAgeUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Email" и сверяем с ${testDataForCreateUser['userEmail']}.`, async () => {
      let currentEmailUser = await webTablesPage.getUserData(testDataForCreateUser['userEmail'], 'userEmail')
      await assertByState(testDataForCreateUser['userEmail'], currentEmailUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Salary" и сверяем с ${testDataForCreateUser['salary']}.`, async () => {
      let currentSalaryUser = await webTablesPage.getUserData(testDataForCreateUser['userEmail'], 'salary')
      await assertByState(testDataForCreateUser['salary'], currentSalaryUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Department" и сверяем с ${testDataForCreateUser['department']}.`, async () => {
      let currentDepartmentUser = await webTablesPage.getUserData(testDataForCreateUser['userEmail'], 'department')
      await assertByState(testDataForCreateUser['department'], currentDepartmentUser, 'match')
    })

    await test.step(`Post-condition`, async () => {
      await test.step('Удаляем пользователя', async () => {
        await webTablesPage.clickUsersActionButtonByUserEmail('Delete', testDataForCreateUser['userEmail'])
      })
    })
  })

  test('CASE_9: Проверка функционала удаления пользователя в таблице.', async () => {
    let userEmail: string = ''

    await test.step('Precondition.', async () => {
      await test.step('Подготавливаем пользователя', async () => {
        userEmail = await webTablesPage.addUser()
      })
    })

    await test.step(`Нажимаем на кнопку "Delete" у созданного пользователя с email ${userEmail}`, async () => {
      await webTablesPage.clickUsersActionButtonByUserEmail('Delete', userEmail)
    })

    await test.step('Проверяем что пользователь удалён.', async () => {
      await webTablesPage.checkVisibilityUserByEmail(userEmail, 'toBeHidden')
    })
  })

  test('CASE_10: Проверка отображения индикации при поиске несуществующего пользователя.', async () => {
    await test.step('Precondition.', async () => {
      await test.step('Вводим в поиск несуществующий "Email"', async () => {
        await webTablesPage.fillSearchInput('userEmail')
      })
    })

    await test.step('Проверяем отображение индикации.', async () => {
      await webTablesPage.verifyIndicatorTableEmpty('toBeVisible')
    })
  })

  test('CASE_11: Проверка функционала пагинации в таблице.', async () => {
    let userEmails: string[]
    const rows = 5
    const userCount = 10

    await test.step('Pre-condition.', async () => {
      await test.step('Выбрать отображение в "5 rows"', async () => {
        await webTablesPage.rowsPerPage(rows)
      })

      await test.step('Заготавливаем пользователей.', async () => {
        userEmails = await webTablesPage.usersGenerator(userCount)
      })
    })

    await test.step('Сохраняем номер текущей страницы и пользователя из первой строки.', async () => {
      initialPage = await webTablesPage.pageNumberInput.inputValue()
      initialUserEmail = await webTablesPage.getFirstUserData('userEmail')
    })

    await test.step('Нажимаем на кнопку "Next".', async () => {
      await webTablesPage.clickPaginate('Next')
    })

    await test.step('Сравниваем номера.', async () => {
      const actualPageNumber: string = await webTablesPage.pageNumberInput.inputValue()
      await assertByState(actualPageNumber, initialPage, 'notMatch')
    })

    await test.step('Проверяем что на страницы изменились пользователи.', async () => {
      const actualUser = await webTablesPage.getFirstUserData('userEmail')
      await assertByState(actualUser, initialUserEmail, 'notMatch')
    })

    await test.step('Сохраняем номер текущей страницы и пользователя из первой строки.', async () => {
      initialPage = await webTablesPage.pageNumberInput.inputValue()
      initialUserEmail = await webTablesPage.getFirstUserData('userEmail')
    })

    await test.step('Нажимаем на кнопку "Previous".', async () => {
      await webTablesPage.clickPaginate('Previous')
    })

    await test.step('Сравниваем номера.', async () => {
      const actualPageNumber: string = await webTablesPage.pageNumberInput.inputValue()
      await assertByState(actualPageNumber, initialPage, 'notMatch')
    })

    await test.step('Проверяем что на страницы изменились пользователи.', async () => {
      const actualUser = await webTablesPage.getFirstUserData('userEmail')
      await assertByState(actualUser, initialUserEmail, 'notMatch')
    })

    await test.step('Post-condition', async () => {
      await test.step('Удаляем созданных пользователей', async () => {
        await webTablesPage.deleteAddedUsers(userEmails)
      })
    })
  })

  test('CASE_12: Проверка функционала перехода страницы по номеру в таблице.', async () => {
    let userEmails: string[]
    const rows = 5
    const userCount = 10
    const initialPageNumber = 1
    const nextPageNumber = 2

    await test.step('Pre-condition.', async () => {
      await test.step('Выбрать отображение в "5 rows"', async () => {
        await webTablesPage.rowsPerPage(rows)
      })

      await test.step('Заготавливаем пользователей.', async () => {
        userEmails = await webTablesPage.usersGenerator(userCount)
      })
    })

    await test.step('Сохраняем номер текущей страницы и пользователя из первой строки.', async () => {
      initialPage = await webTablesPage.pageNumberInput.inputValue()
      initialUserEmail = await webTablesPage.getFirstUserData('userEmail')
    })

    await test.step('Изменяем номер текущей страницы "1", на номер "2" и подтверждаем ввод.', async () => {
      await webTablesPage.fillPageNumberInput(nextPageNumber)
    })

    await test.step('Проверяем изменения страницы на номер "2".', async () => {
      const actualPageNumber: string = await webTablesPage.pageNumberInput.inputValue()
      await assertByState(actualPageNumber, initialPage, 'notMatch')
    })

    await test.step('Проверяем что на страницы изменились пользователи.', async () => {
      const actualUser = await webTablesPage.getFirstUserData('userEmail')
      await assertByState(actualUser, initialUserEmail, 'notMatch')
    })

    await test.step('Post-condition', async () => {
      await test.step('Переходим в начало страницы', async () => {
        await webTablesPage.fillPageNumberInput(initialPageNumber)
      })

      await test.step('Удаляем созданных пользователей', async () => {
        await webTablesPage.deleteAddedUsers(userEmails)
      })
    })
  })

  test('CASE_13: Проверка функционала выбора количества строк в таблице.', async () => {
    const initialAmountRows: SelectingAmountRows = 5
    const nextAmountRows: SelectingAmountRows = 10

    await test.step('Precondition.', async () => {
      await test.step(`Выбрать отображение в ${initialAmountRows}.`, async () => {
        await webTablesPage.rowsPerPage(initialAmountRows)
      })
    })

    await test.step('Проверяем количество строк в таблице.', async () => {
      await webTablesPage.checkRowsAmount(initialAmountRows)
    })

    await test.step(`Выбираем количество строк в ${nextAmountRows}.`, async () => {
      await webTablesPage.rowsPerPage(nextAmountRows)
    })

    await test.step('Проверяем количество строк в таблице.', async () => {
      await webTablesPage.checkRowsAmount(nextAmountRows)
    })
  })
})