import { createSelector } from '@ngrx/store';

export const selectStockListState = (state: any) => state;

export const selectStockData = createSelector(
  selectStockListState,
  state => state.stock.stockData
);

export const selectStockChartData = createSelector(
  selectStockListState,
  state => state.stock.stockChartData
);

export const selectStockDataLoaded = createSelector(
  selectStockListState,
  state => state.stock.stockDataLoaded
);
