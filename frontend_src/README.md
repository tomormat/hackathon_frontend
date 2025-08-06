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

#BACKEND
# team-rocket
Hackathon Project - Stock Portfolio Management System

## Backend API Documentation for Frontend Developers

### Base URL
```
http://localhost:8080
```

### API Endpoints

#### 1. Portfolio Management

##### Get All Portfolio Stocks
- **Endpoint**: `GET /api/teamrocket/stocks/getall`
- **Description**: Retrieves all stocks in the user's portfolio
- **Response**: Array of portfolio items

**Example Request:**
```javascript
fetch('http://localhost:8080/api/teamrocket/stocks/getall', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => console.log(data));
```

**Example Response:**
```json
[
    {
        "id": 1,
        "name": "Apple Inc.",
        "tickerSymbol": "AAPL",
        "quantity": 10.5,
        "priceBoughtAt": 150.25,
        "currentPrice": 175.30,
        "timeUpdated": "2025-08-06T14:30:00"
    }
]
```

##### Get Real-time Stock Information
- **Endpoint**: `GET /api/teamrocket/stocks/getstockinfo/{tickerSymbol}`
- **Description**: Fetches current stock price and information
- **Parameters**: `tickerSymbol` (path parameter) - e.g., "AAPL", "MSFT"

**Example Request:**
```javascript
fetch('http://localhost:8080/api/teamrocket/stocks/getstockinfo/AAPL', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => console.log(data));
```

**Example Response:**
```json
{
    "tickerSymbol": "AAPL",
    "currentPrice": 175.30,
    "timeUpdated": "2025-08-06T14:35:22"
}
```

#### 2. Order Management

##### Get Transaction History
- **Endpoint**: `GET /api/teamrocket/order/history`
- **Description**: Retrieves all past transactions/orders
- **Response**: Array of order objects

**Example Request:**
```javascript
fetch('http://localhost:8080/api/teamrocket/order/history', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => console.log(data));
```

**Example Response:**
```json
[
    {
        "orderID": 1,
        "tickerSymbol": "AAPL",
        "orderAction": "BUY",
        "dollarAmount": 1500.00,
        "executionDateTime": "2025-08-06T10:15:30"
    }
]
```

##### Place New Order
- **Endpoint**: `POST /api/teamrocket/order/makeorder`
- **Description**: Places a new buy/sell order
- **Request Body**: Order object with required fields

**Example Request:**
```javascript
const orderData = {
    tickerSymbol: "AAPL",
    orderAction: "BUY", // or "SELL"
    dollarAmount: 1000.00,
    executionDateTime: new Date().toISOString()
};

fetch('http://localhost:8080/api/teamrocket/order/makeorder', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
})
.then(response => response.json())
.then(data => console.log(data));
```

**Request Body Format:**
```json
{
    "tickerSymbol": "AAPL",
    "orderAction": "BUY",
    "dollarAmount": 1000.00,
    "executionDateTime": "2025-08-06T14:30:00"
}
```

**Response:**
```json
"Order was successful"
```

### Data Types Reference

#### Order Object
```typescript
interface Order {
    orderID?: number;           // Auto-generated
    tickerSymbol: string;       // Stock symbol (e.g., "AAPL")
    orderAction: "BUY" | "SELL"; // Order type
    dollarAmount: number;       // Amount in dollars
    executionDateTime: string;  // ISO datetime string
}
```

#### PortfolioItem Object
```typescript
interface PortfolioItem {
    id: number;
    name: string;               // Company name
    tickerSymbol: string;       // Stock symbol
    quantity: number;           // Number of shares owned
    priceBoughtAt: number;      // Purchase price per share
    currentPrice?: number;      // Current market price
    timeUpdated?: string;       // ISO datetime string
}
```

#### Stock Object
```typescript
interface Stock {
    tickerSymbol: string;
    currentPrice: number;
    timeUpdated: string;        // ISO datetime string
}
```

### Frontend Setup Requirements

1. **CORS Handling**: The backend currently doesn't have CORS configured. You may need to:
   - Use a development proxy (e.g., in React: add `"proxy": "http://localhost:8080"` to package.json)
   - Or configure CORS on the backend

2. **Error Handling**: Always implement proper error handling:
```javascript
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('API call failed:', error);
    });
```

3. **Environment Variables**: Consider using environment variables for the base URL:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
```

### TODOs for Frontend-Backend Integration

1. **Base URL Consistency**
   - Ensure the frontend uses the correct base URL (`http://localhost:8080`) for all API calls.
   - Store the base URL in `environment.ts` for better maintainability.

2. **CORS Configuration**
   - Configure CORS in the backend to allow requests from `http://localhost:4200`.

3. **Error Handling**
   - Implement proper error handling in the frontend for API calls.
   - Ensure the backend returns meaningful error messages and HTTP status codes.

4. **Data Format Consistency**
   - Verify that the frontend and backend use consistent data structures for all API interactions.
   - Validate incoming data in the backend using libraries like `javax.validation`.

5. **Date/Time Handling**
   - Ensure the frontend can parse and display ISO 8601 date/time formats returned by the backend.

6. **Monetary Values**
   - Display monetary values in the frontend with proper formatting (e.g., `$150.00`).

7. **API Endpoints**
   - Test all API endpoints to ensure they work as expected.
   - Create Angular services for each module (e.g., `PortfolioService`, `OrderService`, `StockService`).

8. **Environment Variables**
   - Use environment variables in both the frontend and backend for sensitive data and configuration values.

9. **Authentication**
   - Plan for token-based authentication (e.g., JWT) if required in the future.

10. **Testing**
    - Test all API integrations in the frontend using Angular's `HttpTestingController`.
    - Use tools like Postman or Swagger to test backend endpoints.

11. **Real-Time Updates**
    - Consider using WebSockets or Server-Sent Events (SSE) for real-time stock price updates.

12. **Documentation**
    - Keep the backend and frontend documentation up-to-date with any changes.

13. **Backend Setup**
    - Ensure the backend is running on the correct port (`8080`) and the database is properly configured.
    - Verify that all required environment variables (`MYSQL_USERNAME`, `MYSQL_PASSWORD`, `finnhub.api.key`) are set.

14. **Frontend Setup**
    - Configure the frontend to use the correct API base URL.
    - Test all API integrations to ensure they work as expected.

### Backend Setup

1. **Start the Backend**: Run the Spring Boot application (default port 8080)
2. **Database**: Ensure MySQL is running with the configured database
3. **Environment Variables**: Set up required environment variables:
   - `MYSQL_USERNAME`
   - `MYSQL_PASSWORD`
   - `finnhub.api.key` (for stock data)

### Notes
- All endpoints return JSON responses
- Date/time fields use ISO 8601 format
- No authentication required (currently)
- All monetary values are in USD
- Stock symbols should be valid ticker symbols (e.g., AAPL, MSFT, GOOGL)
