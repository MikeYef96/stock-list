const mockStocks = [
  { symbol: 'AAPL', company: 'Apple Inc.', price: 150.25, changePercent: 2.5, changeDollars: 3.75 },
  { symbol: 'GOOG', company: 'Alphabet Inc.', price: 140.80, changePercent: 1.8, changeDollars: 2.50 },
  { symbol: 'FB', company: 'Meta Platforms Inc.', price: 320.50, changePercent: -1.2, changeDollars: -3.92 },
  { symbol: 'AMZN', company: 'Amazon.com Inc.', price: 175.45, changePercent: 3.1, changeDollars: 5.25 },
  { symbol: 'TWTR', company: 'Twitter Inc.', price: 65.80, changePercent: 0.5, changeDollars: 0.33 },
  { symbol: 'JNPR', company: 'Juniper Networks Inc.', price: 32.10, changePercent: -0.8, changeDollars: -0.26 },
  { symbol: 'IPG', company: 'Interpublic Group', price: 38.45, changePercent: 1.2, changeDollars: 0.46 },
  { symbol: 'PANW', company: 'Palo Alto Networks', price: 185.60, changePercent: 2.3, changeDollars: 4.20 },
  { symbol: 'IBM', company: 'International Business Machines', price: 142.30, changePercent: -0.5, changeDollars: -0.71 },
  { symbol: 'DDD', company: '3D Systems Corporation', price: 22.15, changePercent: 1.5, changeDollars: 0.33 },
  { symbol: 'TLRY', company: 'Tilray Brands Inc.', price: 6.80, changePercent: -2.1, changeDollars: -0.15 },
  { symbol: 'VRPX', company: 'Virpax Pharmaceuticals', price: 4.25, changePercent: 0.8, changeDollars: 0.03 },
  { symbol: 'ALF', company: 'Alfa Laval', price: 58.90, changePercent: 1.9, changeDollars: 1.10 },
  { symbol: 'MNDY', company: 'monday.com Ltd.', price: 185.25, changePercent: 2.7, changeDollars: 4.85 },
  { symbol: 'HD', company: 'The Home Depot', price: 315.40, changePercent: 0.9, changeDollars: 2.82 },
  { symbol: 'WB', company: 'Weibo Corporation', price: 8.45, changePercent: -0.3, changeDollars: -0.03 }
];

const generateChartData = (symbol) => {
  const basePrice = mockStocks.find(s => s.symbol === symbol)?.price || 100;
  const data = [];
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const variation = (Math.random() - 0.5) * 10;
    data.push({
      date: date.toISOString().split('T')[0],
      close: basePrice + variation,
      open: basePrice + variation - 2,
      high: basePrice + variation + 3,
      low: basePrice + variation - 5,
      volume: Math.floor(Math.random() * 50000000) + 10000000
    });
  }
  return data;
};

const generateStockInfo = (symbol) => {
  const stock = mockStocks.find(s => s.symbol === symbol);
  return {
    assetProfile: {
      address1: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States',
      phone: '+1-415-555-0123',
      website: 'https://www.example.com',
      industry: 'Technology',
      sector: 'Technology',
      longBusinessSummary: `${stock.company} is a leading technology company known for innovation and excellence. This is mock data for demonstration purposes.`,
      fullTimeEmployees: 150000,
      auditRisk: 'Low',
      boardRisk: 'Low',
      compensationAsOfDate: new Date().toISOString().split('T')[0],
      compensationRisk: 'Low',
      governanceEpochDate: Math.floor(Date.now() / 1000),
      overallRisk: 'Low',
      shareClassDescription: 'Class A',
      shareHolderRightsDescription: 'Standard'
    }
  };
};

module.exports = {
  mockStocks,
  generateChartData,
  generateStockInfo
};
