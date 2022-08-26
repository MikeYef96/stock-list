import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import * as stockListActions from './stocks-list.actions';
import { StockListApiService } from '../services/stock-list-api.service';
import { StockListModel } from '../interfaces/stock-model.interface';


@Injectable()
export class StocksListEffects {

  constructor(
    private actions$: Actions,
    private stockListApiService: StockListApiService,
  ) { }

  stockList$ = createEffect(() => this.actions$.pipe(
    ofType(stockListActions.stockList),
    switchMap(() => this.stockListApiService.getStockList()
      .pipe(
        map((stocks: StockListModel[]) => stockListActions.stockListSuccess({ stocks })),
        catchError(() => of(stockListActions.stockListFailure()))
      )
    )
  ));
}
