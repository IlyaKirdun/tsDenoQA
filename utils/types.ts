export type SortingCell =
    | 'firstName'
    | 'lastName'
    | 'userEmail'
    | 'age'
    | 'salary'
    | 'department';

export type SelectingAmountRows =
    | 5
    | 10
    | 20
    | 25
    | 50
    | 100;

export const defaultUserObject: { [key: string]: string } = {
    firstName: 'Ivan',
    lastName: 'Ivanov',
    userEmail: 'Ivanovich@gmail.com',
    age: '2',
    salary: '5000',
    department: 'QA'
}

export interface NavigationBarStructure {[ key: string ]: string[]}

export type ElementsOnMainPage =
    | 'Elements'
    | 'Forms'
    | 'Alerts, Frame & Windows'
    | 'Widgets'
    | 'Interactions'
    | 'Book Store Application'

export type VisibilityState = 'toBeVisible'|'toBeHidden'