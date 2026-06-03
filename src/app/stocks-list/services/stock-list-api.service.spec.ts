import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StockListApiService } from './stock-list-api.service';

describe('StockListApiService', () => {
  let service: StockListApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StockListApiService]
    });

    service = TestBed.inject(StockListApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getStockList method', () => {
    expect(typeof service.getStockList).toBe('function');
  });

  it('should call getStockList and return stock data', () => {
    const mockStocks = [
      { symbol: 'AAPL', change: 1.5, changeInPercent: 0.5, lastTradePriceOnly: 150.5 },
      { symbol: 'GOOGL', change: 2.0, changeInPercent: 0.8, lastTradePriceOnly: 140.2 }
    ];

    service.getStockList().subscribe(stocks => {
      expect(stocks.length).toBe(2);
      expect(stocks[0].symbol).toBe('AAPL');
      expect(stocks[1].symbol).toBe('GOOGL');
    });

    const req = httpMock.expectOne(request => request.url.includes('/query'));
    expect(req.request.method).toBe('GET');
    req.flush(mockStocks);
  });
});
