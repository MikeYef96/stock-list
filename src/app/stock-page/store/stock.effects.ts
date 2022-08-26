import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as stockInfoActions from './stock.actions';
import { StockApiService } from '../services/stock-api.service';
import { ChartDataModel } from '../interfaces/chart-data.model';

@Injectable()
export class StockEffects {

  constructor(
    private actions$: Actions,
    private stockApiService: StockApiService
  ) { }

  stockData$ = createEffect(() => this.actions$.pipe(
    ofType(stockInfoActions.stockData),
    switchMap(({ symbol }) => this.stockApiService.getStockInfoData(symbol)
      .pipe(
        map(({ assetProfile }) => stockInfoActions.stockDataSuccess({ stockData: assetProfile })),
        catchError(() => of(stockInfoActions.stockDataFailure()))
      )
    )
  ));

  stockChartData$ = createEffect(() => this.actions$.pipe(
    ofType(stockInfoActions.stockChartData),
    switchMap(({ symbol }) => this.stockApiService.getStockChartData(symbol)
      .pipe(
        map((stockChartData: ChartDataModel[]) => stockInfoActions.stockChartDataSuccess({ stockChartData })),
        catchError(() => of(stockInfoActions.stockChartDataFailure()))
      )
    )
  ));
}
