import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { StockApiService } from './services/stock-api.service';
import { StockState } from './store/stock.reducer';
import * as stockActions from './store/stock.actions'
import * as stockSelectors from './store/stock.selectors'
import { StockInfoModel } from './interfaces/stock-info.model';

@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.scss']
})
export class StockPageComponent implements OnDestroy {

  infoData!: StockInfoModel;
  symbol!: string;

  stockDataLoaded$: Observable<boolean> = this.stockStore.select(stockSelectors.selectStockDataLoaded);
  subscription$ = new Subject();

  constructor(
    private stockApiService: StockApiService,
    private route: Router,
    private stockStore: Store<StockState>
  ) {
    this.symbol = this.route.url.split('=')[1];
    this.stockStore.dispatch(stockActions.stockData({ symbol: this.symbol }));
    this.stockStore.dispatch(stockActions.stockChartData({ symbol: this.symbol }));

    this.stockStore.select(stockSelectors.selectStockData)
      .pipe(
        takeUntil(this.subscription$),
        filter(res => Boolean(res))
      )
      .subscribe((infoData: StockInfoModel) => this.infoData = infoData)
  }

  ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
  }

}
