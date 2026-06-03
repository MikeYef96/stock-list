import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { StockApiService } from './services/stock-api.service';
import { StockState } from './store/stock.reducer';
import * as stockActions from './store/stock.actions';
import * as stockSelectors from './store/stock.selectors';
import { StockInfoModel } from './interfaces/stock-info.model';
import { ChartComponent } from './components/chart/chart.component';

@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ChartComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockPageComponent {
  infoData!: StockInfoModel;
  symbol!: string;
  subscription$ = new Subject<void>();

  get stockDataLoaded$(): Observable<boolean> {
    return this.stockStore.select(stockSelectors.selectStockDataLoaded);
  }

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
      .subscribe((infoData: StockInfoModel) => this.infoData = infoData);
  }
}
