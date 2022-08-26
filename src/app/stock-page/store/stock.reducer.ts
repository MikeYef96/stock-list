import { Action, createReducer, on } from '@ngrx/store';

import * as stockItemActions from './stock.actions';
import { ChartDataModel } from '../interfaces/chart-data.model';
import { StockInfoModel } from '../interfaces/stock-info.model';

export interface StockState {
  stockData: StockInfoModel | null;
  stockChartData: ChartDataModel[] | null;
  stockDataLoaded: boolean;
}

export const initialState: StockState = {
  stockData: null,
  stockChartData: null,
  stockDataLoaded: false
}

export function stockReducer(
  state: StockState | undefined,
  action: Action
): StockState {
  return reducer(state, action);
}

const reducer = createReducer<StockState>(
  initialState,

  // Stock Info Data
  on(stockItemActions.stockData, state => ({
    ...state,
    stockDataLoaded: false
  })),

  on(stockItemActions.stockDataSuccess, (state, { stockData }) => ({
    ...state,
    stockData,
    stockDataLoaded: true
  })),

  on(stockItemActions.stockDataFailure, state => ({
    ...state,
    stockDataLoaded: false
  })),

  // Stock Chart Data
  on(stockItemActions.stockChartDataSuccess, (state, { stockChartData }) => ({
    ...state,
    stockChartData
  }))
)
