import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StockApiService } from './stock-api.service';

describe('StockApiService', () => {
  let service: StockApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StockApiService]
    });

    service = TestBed.inject(StockApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getStockInfoData method', () => {
    expect(typeof service.getStockInfoData).toBe('function');
  });

  it('should have getStockChartData method', () => {
    expect(typeof service.getStockChartData).toBe('function');
  });

  it('should call getStockInfoData and return stock info', () => {
    const mockData = {
      assetProfile: {
        symbol: 'AAPL',
        shortName: 'Apple Inc.'
      }
    };

    service.getStockInfoData('AAPL').subscribe(data => {
      expect(data.assetProfile.symbol).toBe('AAPL');
    });

    const req = httpMock.expectOne(request => request.url.includes('v10/finance'));
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should call getStockChartData and return chart data', () => {
    const mockChartData = [
      { date: '2024-01-01', close: 150.5, open: 149.8, high: 151.2, low: 149.5, adjClose: 150.5 }
    ];

    service.getStockChartData('AAPL').subscribe(data => {
      expect(Array.isArray(data)).toBeTruthy();
      expect(data.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(request => request.url.includes('historical'));
    expect(req.request.method).toBe('GET');
    req.flush(mockChartData);
  });
});
