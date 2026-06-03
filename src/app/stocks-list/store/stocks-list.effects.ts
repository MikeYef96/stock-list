import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';

import * as stockListActions from './stocks-list.actions';
import { StockListApiService } from '../services/stock-list-api.service';
import { StockListModel } from '../interfaces/stock-model.interface';


@Injectable()
export class StocksListEffects {
  private actions$: Actions = inject(Actions);
    private stockListApiService: StockListApiService = inject(StockListApiService);

  readonly stockList$ = createEffect(
    () => this.actions$.pipe(
      ofType(stockListActions.stockList),
      switchMap(() => this.stockListApiService.getStockList()
        .pipe(
          map((stocks: StockListModel[]) => stockListActions.stockListSuccess({ stocks })),
          catchError(() => of(stockListActions.stockListFailure()))
        )
      )
    ),
    { dispatch: true }
  );
}
