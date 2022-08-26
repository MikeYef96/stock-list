import { createAction, props } from '@ngrx/store';

import { StockListModel } from '../interfaces/stock-model.interface';

export const stockList = createAction('[Stock List] Stock List');
export const stockListSuccess = createAction('[Stock List] Stock List Success', props<{ stocks: StockListModel[] }>());
export const stockListFailure = createAction('[Stock List] Stock List Failure');
