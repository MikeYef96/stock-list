# Stock List Mock Server

A simple Express.js mock server for the Stock List application that provides API endpoints for stock data without external dependencies.

## Setup

Install dependencies:
```bash
cd server
npm install
```

## Running the Server

Start the mock server:
```bash
npm start
```

The server will run on `http://localhost:3000` by default.

### Available Endpoints

- **Health Check**: `GET /health`
  - Response: `{ status: 'ok', message: 'Stock List Mock Server is running' }`

- **Stock Snapshot**: `GET /stocks/snapshot?symbols=AAPL,GOOG,FB`
  - Query params: `symbols` (comma-separated list of stock symbols)
  - Returns: Array of stocks with current prices and daily changes

- **Historical Data**: `GET /stocks/historical/:symbol`
  - Path params: `symbol` (e.g., AAPL, GOOG)
  - Returns: Array of 30 days of historical chart data

- **Stock Info**: `GET /stocks/info/:symbol`
  - Path params: `symbol` (e.g., AAPL, GOOG)
  - Returns: Detailed company information and asset profile

## Mock Data

The server includes mock data for 16 stock symbols:
- AAPL, GOOG, FB, AMZN, TWTR, JNPR, IPG, PANW, IBM, DDD, TLRY, VRPX, ALF, MNDY, HD, WB

### Running Both Applications

In separate terminals:

**Terminal 1 - Start the mock server:**
```bash
cd server
npm start
# Mock server running on http://localhost:3000
```

**Terminal 2 - Start the Angular app:**
```bash
ng serve
# Angular app running on http://localhost:4200
```

The Angular application is already configured to use the local mock server via the environment configuration files.

## Notes

- The mock server is for development and testing purposes only
- Historical data is generated procedurally based on the current date
- Stock prices in the mock data are example values and do not reflect real market data
- No external API calls or RapidAPI keys are needed
