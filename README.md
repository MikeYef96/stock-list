# Stock List Application

A modern Angular 18 LTS application for managing and viewing stock market data with lazy-loaded routes, standalone components, and NgRx state management.

## ⚠️ Important Setup Notes

### RapidAPI Authentication
This application uses the **RapidAPI Yahoo Finance API** for stock data. To use real stock market data instead of mock data:

1. Create an account at [RapidAPI](https://rapidapi.com)
2. Subscribe to the [Yahoo Finance API](https://rapidapi.com/spartan/api/yahoo-finance-api)
3. Obtain your **RAPID_API_KEY** from the RapidAPI dashboard
4. Store your credentials securely in the backend server configuration

**Note:** The application is currently configured to use a local mock server that doesn't require authentication. For production use with real data, you'll need to configure the API credentials.

---

## Project Structure

```
stock-list/
├── src/
│   ├── app/
│   │   ├── app.component.ts          # Root component (standalone)
│   │   ├── app.routes.ts             # Lazy-loaded routing configuration
│   │   ├── dashboard/                # Dashboard layout
│   │   │   ├── dashboard.component.ts
│   │   │   └── components/
│   │   │       └── side-bar/
│   │   ├── stocks-list/              # Stock list view
│   │   │   ├── components/
│   │   │   ├── interfaces/
│   │   │   ├── services/
│   │   │   └── store/               # NgRx state management
│   │   └── stock-page/              # Stock detail view
│   │       ├── components/
│   │       ├── interfaces/
│   │       ├── services/
│   │       └── store/               # NgRx state management
│   ├── environments/                # Environment configuration
│   ├── index.html
│   ├── main.ts                      # Bootstrap with standalone pattern
│   ├── styles.scss
│   └── test.ts
├── server/                          # Mock API server
│   ├── index.js
│   ├── mockData.js
│   └── package.json
├── angular.json
├── karma.conf.js
├── tsconfig.json
└── README.md
```

## Technology Stack

- **Framework**: Angular 18.2.14 (LTS)
- **State Management**: NgRx 18.0.0 with Effects and Store Devtools
- **HTTP Client**: Angular HttpClient with interceptors
- **Styling**: SCSS
- **Routing**: Lazy-loaded standalone components
- **Charts**: ngx-charts with D3
- **Date Handling**: day.js
- **UI Components**: Angular Material 18.0.0
- **Build Tool**: Webpack via @angular-devkit/build-angular
- **Testing**: Karma + Jasmine
- **TypeScript**: 5.5.2 (ES2022 target)

## Getting Started

### Prerequisites
- Node.js 18+ (tested with v22.22.2)
- npm 10+

### Installation

1. **Install Angular app dependencies:**
   ```bash
   npm install
   ```

2. **Install mock server dependencies:**
   ```bash
   cd server
   npm install
   cd ..
   ```

### Environment Configuration

#### Mock Server Setup (Default)
The application comes configured with a local mock server that requires no authentication:

1. **Copy environment example (optional):**
   ```bash
   cp .env-example .env  # in server/ folder
   ```

2. **Start the mock server:**
   ```bash
   cd server
   npm start
   ```

The mock server will run on `http://localhost:3000` with simulated stock data for testing and development.

#### Real API Setup (Optional - For Production)
To use real Yahoo Finance API data instead of mock data:

1. **Create a RapidAPI account:** https://rapidapi.com
2. **Subscribe to Yahoo Finance API:** https://rapidapi.com/spartan/api/yahoo-finance-api
3. **Get your credentials** from RapidAPI dashboard
4. **Configure server environment:**
   ```bash
   cd server
   cp .env-example .env
   # Edit .env and uncomment the RAPID_API_KEY and RAPID_API_HOST lines
   # Add your actual credentials from RapidAPI
   ```
5. **Update the mock server** to forward requests to the real API (backend only)

**Important:** Credentials are only stored on the backend server for security. The Angular frontend never has direct access to API keys.

## Running the Application

### Option 1: With Mock Server (Default - No Auth Required)

**Terminal 1 - Start the mock API server:**
```bash
cd server
npm start
# Mock server running on http://localhost:3000
# Provides simulated stock data for all 16 symbols
```

**Terminal 2 - Start the Angular development server:**
```bash
ng serve
# Navigate to http://localhost:4200/
```

The app will automatically reload when you modify source files. The mock server handles all API requests without requiring authentication.

### Option 2: Production Build

```bash
ng build --configuration production
```

Build artifacts are stored in the `dist/` directory. The production bundle includes:
- Initial bundle: ~433KB
- Lazy chunks:
  - dashboard: 42-48KB
  - stocks-list: 107KB
  - stock-page: 204KB

### Option 3: Using Real Yahoo Finance API (Backend Only)

To use real stock market data:

1. Follow the "Real API Setup" steps in the [Environment Configuration](#environment-configuration) section
2. Update the mock server to forward requests to the real API (modify `server/index.js`)
3. Restart the server: `npm start`

The Angular frontend remains unchanged - credentials are only accessible on the backend.

## Development Commands

### Code Scaffolding

Generate new components:
```bash
ng generate component component-name
ng generate directive|pipe|service|class|guard|interface|enum|module
```

### Running Tests

Run unit tests:
```bash
ng test
```

Run tests in headless mode:
```bash
ng test --watch=false --browsers=ChromeHeadless
```

### Code Style

The project uses TypeScript strict mode with the following checks:
- `strict`: true
- `noImplicitAny`: true
- `noImplicitReturns`: true
- `strictNullChecks`: true

## Architecture Highlights

### Standalone Components
All components are standalone with:
- `standalone: true` in component metadata
- Explicit imports for dependencies
- OnPush change detection strategy

### Lazy Loading
Routes use lazy loading via `loadComponent()`:
```typescript
{
  path: 'stocks-list',
  loadComponent: () => import('./stocks-list/stocks-list.component').then(m => m.StocksListComponent)
}
```

### State Management
NgRx store structure:
- `stocksList`: Manages stock list state with actions, reducers, and effects
- `stock`: Manages individual stock detail state

Selectors provide optimized access to state:
```typescript
export const selectAllStocks$ = createSelector(
  selectStocksListState,
  state => state.stocks
);
```

### API Services
- `StockListApiService`: Fetches list of stocks
- `StockApiService`: Fetches individual stock details and chart data

## Mock Server API

The local mock server provides these endpoints with **no authentication required**:

- **Health Check**: `GET /health`
  - Verify server is running
  
- **Stock Snapshot**: `GET /stocks/snapshot?symbols=AAPL,GOOG,FB`
  - Returns list of stocks with current prices and daily changes
  
- **Historical Data**: `GET /stocks/historical/:symbol`
  - Returns 30 days of simulated chart data
  
- **Stock Info**: `GET /stocks/info/:symbol`
  - Returns company details and asset profile

**Mock Data**: The server includes simulated data for 16 stock symbols (AAPL, GOOG, FB, AMZN, TWTR, JNPR, IPG, PANW, IBM, DDD, TLRY, VRPX, ALF, MNDY, HD, WB) with realistic pricing variations and historical patterns.

**No API Keys Required**: Mock server is completely self-contained for development and testing. It does not make any external API calls or require RapidAPI credentials.

## Performance Optimizations

✅ Bundle size tracking with angular.json budgets
✅ Lazy loading for feature modules
✅ OnPush change detection throughout
✅ Tree-shakeable day.js instead of moment.js
✅ Production builds with source maps for debugging

## Documentation

- [Angular Documentation](https://angular.io)
- [NgRx Documentation](https://ngrx.io)
- [Angular Material](https://material.angular.io)
- [ngx-charts](https://swimlane.gitbook.io/ngx-charts)

## Troubleshooting

**Port 4200 already in use:**
```bash
ng serve --port 4300
```

**Port 3000 already in use:**
```bash
cd server
PORT=3001 npm start
```

**Clear Angular cache:**
```bash
rm -rf .angular
ng build
```

## License

MIT
