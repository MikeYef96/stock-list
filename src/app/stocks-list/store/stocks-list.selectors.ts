import { createSelector } from '@ngrx/store';

export const selectStockListState = (state: any) => state;

export const selectStocksList = createSelector(
  selectStockListState,
  state => state.stocksList.list
);
