export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000',
  yahooUrl: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-profile',
  rapidApiKey: process.env['RAPID_API_KEY'],
  rapidApiHost: process.env['RAPID_API_HOST']
};