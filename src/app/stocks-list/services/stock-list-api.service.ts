import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StockListModel } from '../interfaces/stock-model.interface';
import { environment } from '../../../environments/environment';
import { symbolsMock } from '../constants/symbols-list.mock';

@Injectable({
  providedIn: 'root'
})
export class StockListApiService {

  url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getStockList(): Observable<StockListModel[]> {
    return this.http.get<StockListModel[]>(
      this.url + '/stocks/snapshot',
      { params: { symbols: symbolsMock.join() }}
    )
  }

}
