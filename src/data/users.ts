export interface Credentials {
  username: string;
  password: string;
}

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const STANDARD_USER: Credentials = {
  username: 'standard_user',
  password: 'secret_sauce',
};

export const INVALID_USER: Credentials = {
  username: 'invalid_user',
  password: 'wrong_password',
};

export const ERROR_USER: Credentials = {
  username: 'error_user',
  password: 'secret_sauce',
};

export const CHECKOUT_INFO: CheckoutInfo = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345',
};

export const PRODUCTS = {
  BACKPACK: 'Sauce Labs Backpack',
  BIKE_LIGHT: 'Sauce Labs Bike Light',
};

export const BASE_URL = 'https://www.saucedemo.com';

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS:
    'Epic sadface: Username and password do not match any user in this service',
};
