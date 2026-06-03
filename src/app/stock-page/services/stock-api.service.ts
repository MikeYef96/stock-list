import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ChartDataModel } from '../interfaces/chart-data.model';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class StockApiService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  getStockInfoData(symbol: string): Observable<any> {
    const options: any = { 
      params: { symbols: symbol }
    };
    
    options.headers = {
        'x-rapidapi-key': process.env['RAPID_API_KEY'],
        'x-rapidapi-host': process.env['RAPID_API_HOST']
      };
    
    return this.http.get(environment.yahooUrl, options);
  }

  getStockChartData(symbol: string): Observable<ChartDataModel[]> {
    return this.http.get<ChartDataModel[]>(environment.baseUrl + '/stocks/historical/' + symbol)
  }
}
