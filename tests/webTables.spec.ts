import { test } from '@playwright/test'
import MainPage from '../page/main.page'
import WebTablesPage from '../page/webTables.page'
import RegistrationModalWindow from "../utils/components/registrationModalWindow";
import NavigationBar from '../utils/components/navigationBar'
import { removeAds, assertByState } from '../utils/functions'

test.describe('Проверка функциональности на странице "Web Tables', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let webTablesPage: WebTablesPage
  let registrationModalWindow: RegistrationModalWindow

  let pageBeforePagination: string = ''

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
    await test.step('Pre-conditions', async () => {
      await test.step('Нажимаем кнопку "Add"', async () => {
        await webTablesPage.clickAddUserButton()
      })

      await test.step('Проверяем что модальное окно открылось.', async () => {
        await registrationModalWindow.isModalWindowToBeVisible()
      })
    })

    await test.step(`Заполняем поле "First Name", вводим ${testDataForCreateUser['firstName']}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('First Name', testDataForCreateUser['firstName'])
    })

    await test.step('Проверяем поле "First Name" на корректное отображение.', async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('First Name', testDataForCreateUser['firstName'])
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
      await registrationModalWindow.fillInputInModalWindow('department', testDataForCreateUser['department'])
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

      await test.step('Нажать кнопку "Submit"', async () => {
        await registrationModalWindow.clickSubmitButtonInModalWindow()
      })
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
      await assertByState(testDataForCreateUser['firstName'], currentFirstNameUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Last Name" и сверяем с ${testDataForCreateUser['lastName']}.`, async () => {
      let currentLastNameUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'lastName')
      await assertByState(testDataForCreateUser['lastName'], currentLastNameUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Age" и сверяем с ${testDataForCreateUser['age']}.`, async () => {
      let currentAgeUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'age')
      await assertByState(testDataForCreateUser['age'], currentAgeUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Email" и сверяем с ${testDataForCreateUser['email']}.`, async () => {
      let currentEmailUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'email')
      await assertByState(testDataForCreateUser['email'], currentEmailUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Salary" и сверяем с ${testDataForCreateUser['salary']}.`, async () => {
      let currentSalaryUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'salary')
      await assertByState(testDataForCreateUser['salary'], currentSalaryUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Department" и сверяем с ${testDataForCreateUser['department']}.`, async () => {
      let currentDepartmentUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'department')
      await assertByState(testDataForCreateUser['department'], currentDepartmentUser, 'match')
    })
  })

  test('CASE_6: Проверка функционала поиска в таблице.', async () => {
    await test.step(`Заполняем в поле поиска - email пользователя из ${testDataExistingUser['email']}.`, async () => {
      await webTablesPage.fillSearchInput(testDataExistingUser['email'])
    })

    await test.step('Проверяем результат поиска.', async () => {
      let currentEmailUser = await webTablesPage.getUserData(testDataExistingUser['email'], 'email')
      await assertByState(testDataExistingUser['email'], currentEmailUser, 'match')
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
      let currentUserAfterSorting = await webTablesPage.getFirstUserData('firstName')
      await assertByState(firstUserBeforeSorting['firstName'], currentUserAfterSorting, 'notMatch')
    })

    await test.step('Сохраняем "Last Name" пользователя из первой строки.', async () => {
      firstUserBeforeSorting['lastName'] = await webTablesPage.getFirstUserData('lastName')
    })

    await test.step('Нажимаем ячейку сортировки "Last Name".', async () => {
      await webTablesPage.clickOnSortingCell('lastName')
    })

    await test.step('Сравниваем текущего пользователя в первой строке, с сохраненным.', async () => {
      let currentUserAfterSorting = await webTablesPage.getFirstUserData('lastName')
      await assertByState(firstUserBeforeSorting['lastName'], currentUserAfterSorting, 'notMatch')
    })

    await test.step('Сохраняем "Age" пользователя из первой строки.', async () => {
      firstUserBeforeSorting['age'] = await webTablesPage.getFirstUserData('age')
    })

    await test.step('Нажимаем ячейку сортировки "Age".', async () => {
      await webTablesPage.clickOnSortingCell('age')
    })

    await test.step('Сравниваем текущего пользователя в первой строке, с сохраненным.', async () => {
      let currentUserAfterSorting = await webTablesPage.getFirstUserData('age')
      await assertByState(firstUserBeforeSorting['age'], currentUserAfterSorting, 'notMatch')
    })

    await test.step('Сохраняем "Email" пользователя из первой строки.', async () => {
      firstUserBeforeSorting['email'] = await webTablesPage.getFirstUserData('email')
    })

    await test.step('Нажимаем ячейку сортировки "Email".', async () => {
      await webTablesPage.clickOnSortingCell('email')
    })

    await test.step('Сравниваем текущего пользователя в первой строке, с сохраненным.', async () => {
      let currentUserAfterSorting = await webTablesPage.getFirstUserData('email')
      await assertByState(firstUserBeforeSorting['email'], currentUserAfterSorting, 'notMatch')
    })

    await test.step('Сохраняем "Salary" пользователя из первой строки.', async () => {
      firstUserBeforeSorting['salary'] = await webTablesPage.getFirstUserData('salary')
    })

    await test.step('Нажимаем ячейку сортировки "Salary".', async () => {
      await webTablesPage.clickOnSortingCell('salary')
    })

    await test.step('Сравниваем текущего пользователя в первой строке, с сохраненным.', async () => {
      let currentUserAfterSorting = await webTablesPage.getFirstUserData('salary')
      await assertByState(firstUserBeforeSorting['salary'], currentUserAfterSorting, 'notMatch')
    })

    await test.step('Сохраняем "Department" пользователя из первой строки.', async () => {
      firstUserBeforeSorting['department'] = await webTablesPage.getFirstUserData('department')
    })

    await test.step('Нажимаем ячейку сортировки "Department".', async () => {
      await webTablesPage.clickOnSortingCell('department')
    })

    await test.step('Сравниваем текущего пользователя в первой строке, с сохраненным.', async () => {
      let currentUserAfterSorting = await webTablesPage.getFirstUserData('department')
      await assertByState(firstUserBeforeSorting['department'], currentUserAfterSorting, 'notMatch')
    })
  })

  test('CASE_8: Проверка функционала редактирования пользователя', async () => {
    await test.step('Нажимаем на кнопку "Edit" у пользователя "Cierra Vega".', async () => {
      await webTablesPage.editUser()
    })

    await test.step('Проверяем что модальное окно отображается.', async () => {
      await registrationModalWindow.isModalWindowToBeVisible()
    })

    await test.step(`Изменяем в поле "First Name" значение "Cierra" на firstName из ${testDataForCreateUser}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('First Name', testDataForCreateUser['firstName'])
    })

    await test.step('Проверяем поле "First Name" на корректное отображение.', async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('First Name', testDataForCreateUser['firstName'])
    })

    await test.step(`Изменяем в поле "Last Name" значение "Vega" на lastName из ${testDataForCreateUser}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Last Name', testDataForCreateUser['lastName'])
    })

    await test.step('Проверяем поле "Last Name" на корректное отображение.', async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('Last Name', testDataForCreateUser['lastName'])
    })

    await test.step(`Изменяем в поле "Email" значение "cierra@example.com" на email из ${testDataForCreateUser}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('name@example.com', testDataForCreateUser['email'])
    })

    await test.step('Проверяем поле "Email" на корректное отображение.', async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('name@example.com', testDataForCreateUser['email'])
    })

    await test.step(`Изменяем в поле "Age" значение "39" на age из ${testDataForCreateUser}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Age', testDataForCreateUser['age'])
    })

    await test.step('Проверяем поле "Age" на корректное отображение.', async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('Age', testDataForCreateUser['age'])
    })

    await test.step(`Изменяем в поле "Salary" значение "10000" на salary из ${testDataForCreateUser}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Salary', testDataForCreateUser['salary'])
    })

    await test.step('Проверяем поле "Salary" на корректное отображение.', async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('Salary', testDataForCreateUser['salary'])
    })

    await test.step(`Изменяем в поле "Department" значение "Insurance" на department из ${testDataForCreateUser}.`, async () => {
      await registrationModalWindow.fillInputInModalWindow('Department', testDataForCreateUser['department'])
    })

    await test.step('Проверяем поле "Department" на корректное отображение.', async () => {
      await registrationModalWindow.isInputDataCorrectInModalWindow('Department', testDataForCreateUser['department'])
    })

    await test.step('Нажимаем кнопку "Submit".', async () => {
      await registrationModalWindow.clickSubmitButtonInModalWindow()
    })

    await test.step('Проверяем что модальное окно закрылось.', async () => {
      await registrationModalWindow.isModalWindowToBeHidden()
    })

    await test.step(`Получаем данные ячейки "First Name" и сверяем с ${testDataForCreateUser['firstName']}.`, async () => {
      let currentFirstNameUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'firstName')
      await assertByState(testDataForCreateUser['firstName'], currentFirstNameUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Last Name" и сверяем с ${testDataForCreateUser['lastName']}.`, async () => {
      let currentLastNameUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'lastName')
      await assertByState(testDataForCreateUser['lastName'], currentLastNameUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Age" и сверяем с ${testDataForCreateUser['age']}.`, async () => {
      let currentAgeUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'age')
      await assertByState(testDataForCreateUser['age'], currentAgeUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Email" и сверяем с ${testDataForCreateUser['email']}.`, async () => {
      let currentEmailUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'email')
      await assertByState(testDataForCreateUser['email'], currentEmailUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Salary" и сверяем с ${testDataForCreateUser['salary']}.`, async () => {
      let currentSalaryUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'salary')
      await assertByState(testDataForCreateUser['salary'], currentSalaryUser, 'match')
    })

    await test.step(`Получаем данные ячейки "Department" и сверяем с ${testDataForCreateUser['department']}.`, async () => {
      let currentDepartmentUser = await webTablesPage.getUserData(testDataForCreateUser['email'], 'department')
      await assertByState(testDataForCreateUser['department'], currentDepartmentUser, 'match')
    })
  })

  test('CASE_9: Проверка функционала удаления пользователя в таблице.', async () => {
    await test.step('Нажимаем на кнопку "Delete" у пользователя "Cierra Vega".', async () => {
      await webTablesPage.deleteUser()
    })

    await test.step('Ищем пользователя "Cierra Vega" через поиск.', async () => {
      await webTablesPage.fillSearchInput('Cierra')
    })

    await test.step('Проверяем результат поиска.', async () => {
      await webTablesPage.isTableEmpty()
    })
  })

  test('CASE_10: Проверка отображения сообщения при удалении всех пользователей в таблице.', async () => {
    await test.step('Precondition.', async () => {
      await test.step('Удаляем пользователя', async () => {
        await webTablesPage.deleteUser()
      })

      await test.step('Удаляем пользователя', async () => {
        await webTablesPage.deleteUser()
      })

      await test.step('Удаляем пользователя', async () => {
        await webTablesPage.deleteUser()
      })
    })

    await test.step('Проверяем отображение сообщения.', async () => {
      await webTablesPage.isTableEmpty()
    })
  })

  test('CASE_11: Проверка функционала пагинации в таблице.', async () => {
    await test.step('Precondition.', async () => {
      await test.step('Выбрать отображение в "5 rows"', async () => {
        await webTablesPage.selectRowsOnPage('5')
      })

      await test.step('Заготавливаем пользователей.', async () => {
        await registrationModalWindow.usersGeneration()
      })
    })

    await test.step('Сохраняем номер текущей страницы.', async () => {
      pageBeforePagination = await webTablesPage.pageNumberInput.inputValue()
    })

    await test.step('Нажимаем на кнопку "Next".', async () => {
      await webTablesPage.clickPaginate('Next')
    })

    await test.step('Сравниваем номера.', async () => {
      const actualPageNumber: string = await webTablesPage.pageNumberInput.inputValue()
      await assertByState(actualPageNumber, pageBeforePagination, 'notMatch')
    })

    await test.step('Сохраняем номер текущей страницы.', async () => {
      pageBeforePagination = await webTablesPage.pageNumberInput.inputValue()
    })

    await test.step('Нажимаем на кнопку "Previous".', async () => {
      await webTablesPage.clickPaginate('Previous')
    })

    await test.step('Сравниваем номера.', async () => {
      const actualPageNumber: string = await webTablesPage.pageNumberInput.inputValue()
      await assertByState(actualPageNumber, pageBeforePagination, 'notMatch')
    })
  })

  test('CASE_12: Проверка функционала перехода страницы по номеру в таблице.', async () => {
    let usersEmail: string[]

    await test.step('Pre-condition.', async () => {
      await test.step('Выбрать отображение в "5 rows"', async () => {
        await webTablesPage.selectRowsOnPage('5')
      })

      await test.step('Заготавливаем пользователей.', async () => {
        await registrationModalWindow.usersGeneration()
      })
    })

    await test.step('Сохраняем номер текущей страницы.', async () => {
      pageBeforePagination = await webTablesPage.pageNumberInput.inputValue()
    })

    await test.step('Изменяем номер текущей страницы "1", на номер "2" и подтверждаем ввод.', async () => {
      await webTablesPage.fillPageNumbers('2')
    })

    await test.step('Проверяем изменения страницы на номер "2".', async () => {
      const actualPageNumber: string = await webTablesPage.pageNumberInput.inputValue()
      await assertByState(actualPageNumber, pageBeforePagination, 'match')
    })
  })

  test('CASE_13: Проверка функционала выбора количества строк в таблице.', async () => {
    await test.step('Precondition.', async () => {
      await test.step('Выбрать отображение в "5 rows"', async () => {
        await webTablesPage.selectRowsOnPage('5')
      })
    })

    await test.step('Проверяем количество строк в таблице.', async () => {
      await webTablesPage.checkAmountRows(5)
    })

    await test.step('Выбираем количество строк в "10 rows".', async () => {
      await webTablesPage.selectRowsOnPage('10')
    })

    await test.step('Проверяем количество строк в таблице.', async () => {
      await webTablesPage.checkAmountRows(10)
    })
  })
})