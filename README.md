# Meal kits

## How to run

### `yarn`

To install dependencies.

## Set your .env file

Before you run, you need to create an .env file in the root of the folder and set your API key, just like below.

```
REACT_APP_COOKIT_API=<Base URL for Cook it APIs>
REACT_APP_SENTRY_URL=<Sentry public key>
```

### `yarn start`

To run in development mode.

### `yarn test:watch`

To run tests in watch mode.

### `yarn test:e2e:run`

To run end to end test

### `yarn test:coverage`

To get test coverage.

![Coverage image](https://github.com/luizamendes/meal-kits/blob/main/src/assets/Coverage.png)

### `yarn build`

To build the project to production.

## Tecnologies/Libs used:

- **Axios** to perform the HTTP requests
- **Jest**, **React Testing Library** and **Cypress** for the tests
- **Sentry** for logging erros
- **ESLint** and **Prettier** to find and fix problems with code and enforce code style
- **Husky** and **Lint-staged** to assure code is within pattern before commiting and tests are passing
