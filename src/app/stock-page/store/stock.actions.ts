import { createAction, props } from '@ngrx/store';

import { ChartDataModel } from '../interfaces/chart-data.model';
import { StockInfoModel } from '../interfaces/stock-info.model';

// Get Stock Data
export const stockData = createAction('[Stock] Stock Data', props<{ symbol: string }>());
export const stockDataSuccess = createAction('[Stock] Stock Data Success', props<{ stockData: StockInfoModel}>());
export const stockDataFailure = createAction('[Stock] Stock Data Failure');

// Get Stock Chart Data
export const stockChartData = createAction('[Stock] Stock Chart Data', props<{ symbol: string }>());
export const stockChartDataSuccess = createAction('[Stock] Stock Chart Data Success', props<{ stockChartData: ChartDataModel[]}>());
export const stockChartDataFailure = createAction('[Stock] Stock Chart Data Failure');
