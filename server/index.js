require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { mockStocks, generateChartData, generateStockInfo } = require('./mockData');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

/**
 * GET /stocks/snapshot
 * Returns a list of stocks with their current prices and changes
 * Query params: symbols (comma-separated list of stock symbols)
 */
app.get('/stocks/snapshot', (req, res) => {
  const symbols = req.query.symbols ? req.query.symbols.split(',') : [];
  
  const stocks = mockStocks.filter(stock => 
    symbols.length === 0 || symbols.includes(stock.symbol)
  );
  
  res.json(stocks);
});

/**
 * GET /stocks/historical/:symbol
 * Returns historical chart data for a specific stock
 * Path params: symbol (stock symbol)
 */
app.get('/stocks/historical/:symbol', (req, res) => {
  const { symbol } = req.params;
  const chartData = generateChartData(symbol.toUpperCase());
  
  res.json(chartData);
});

/**
 * GET /stocks/info/:symbol
 * Returns detailed information about a stock
 * Path params: symbol (stock symbol)
 */
app.get('/stocks/info/:symbol', (req, res) => {
  const { symbol } = req.params;
  const stockInfo = generateStockInfo(symbol.toUpperCase());
  
  res.json(stockInfo);
});

// Configuration endpoint
app.get('/config', (req, res) => {
  res.json({
    rapidApiKey: process.env.RAPID_API_KEY || '',
    rapidApiHost: process.env.RAPID_API_HOST || ''
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Stock List Mock Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock Stock API Server running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET /health`);
  console.log(`  GET /stocks/snapshot?symbols=AAPL,GOOG,FB`);
  console.log(`  GET /stocks/historical/:symbol`);
  console.log(`  GET /stocks/info/:symbol`);
});
