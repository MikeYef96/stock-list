import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ChartDataModel } from '../interfaces/chart-data.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockApiService {

  url = environment.baseUrl;
  yahooUrl = environment.yahooUrl;

  constructor(private http: HttpClient) { }

  getStockInfoData(symbol: string): Observable<any> {
    return this.http.get(this.yahooUrl, {
      params: { symbol, region: 'US' },
      headers: {
        'x-rapidapi-key': '014e48d07emsh3725f9fd630c3a5p106878jsn33af8967bf9e',
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      }
    }
  )}

  getStockChartData(symbol: string): Observable<ChartDataModel[]> {
    return this.http.get<ChartDataModel[]>(this.url + '/stocks/historical/' + symbol)
  }
}
