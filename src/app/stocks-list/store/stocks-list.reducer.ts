import { Action, createReducer, on } from '@ngrx/store';

import * as stockListActions from './stocks-list.actions';
import { StockListModel } from '../interfaces/stock-model.interface';

export interface StocksListState {
  list: StockListModel[] | null;
}

export const initialState: StocksListState = {
  list: null
}

export function stocksListReducer(
  state: StocksListState | undefined,
  action: Action
): StocksListState {
  return reducer(state, action);
}

const reducer = createReducer<StocksListState>(
  initialState,

  //Get Stock List
  on(stockListActions.stockListSuccess, (state, { stocks }) => ({
    ...state,
    list: stocks
  }))
)
