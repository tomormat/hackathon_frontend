# FrontendSrc

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## HTTP Requests

### Transactions

#### Get All Transactions
- **Endpoint**: `/transactions`
- **Method**: `GET`
- **Response Format**:
  ```json
  [
    {
      "id": 1, // Unique identifier for the transaction
      "stock": {
        "id": 1, // Unique identifier for the stock
        "name": "Apple Inc.", // Name of the stock
        "price": 150.00 // Price of the stock at the time of the transaction
      },
      "amount": 5, // Number of shares involved in the transaction
      "date": "2025-08-01T10:15:00Z", // Date and time of the transaction
      "valueAtDate": 750.00, // Total value of the transaction at the time it occurred
      "currentValue": 740.00, // Current total value of the shares involved in the transaction
      "type": "buy" // Type of transaction (e.g., buy or sell)
    }
  ]
  ```

#### Post a Transaction
- **Endpoint**: `/transactions`
- **Method**: `POST`
- **Request Format**:
  ```json
  {
    "stock": {
      "id": 1, // Unique identifier for the stock
      "name": "Apple Inc." // Name of the stock
    },
    "amount": 5, // Number of shares to be transacted
    "type": "buy" // Type of transaction (e.g., buy or sell)
  }
  ```
- **Response Format**:
  ```json
  {
    "id": 1, // Unique identifier for the transaction
    "stock": {
      "id": 1, // Unique identifier for the stock
      "name": "Apple Inc.", // Name of the stock
      "price": 150.00 // Price of the stock at the time of the transaction
    },
    "amount": 5, // Number of shares involved in the transaction
    "date": "2025-08-01T10:15:00Z", // Date and time of the transaction
    "valueAtDate": 750.00, // Total value of the transaction at the time it occurred
    "currentValue": 740.00, // Current total value of the shares involved in the transaction
    "type": "buy" // Type of transaction (e.g., buy or sell)
  }
  ```

### Stocks

#### Get Stock by ID
- **Endpoint**: `/stocks/:id`
- **Method**: `GET`
- **Response Format**:
  ```json
  {
    "id": 1, // Unique identifier for the stock
    "name": "Apple Inc.", // Name of the stock
    "price": 150.00, // Current price of the stock
    "prices": [150, 152, 149, 151], // Historical prices of the stock
    "times": [
      "2025-08-01T10:00:00Z", // Timestamp for the first price
      "2025-08-01T11:00:00Z", // Timestamp for the second price
      "2025-08-01T12:00:00Z", // Timestamp for the third price
      "2025-08-01T13:00:00Z"  // Timestamp for the fourth price
    ],
    "shares": [5, 10, 15] // Number of shares held at different times
  }
  ```


