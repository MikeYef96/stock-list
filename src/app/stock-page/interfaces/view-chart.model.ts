export interface ViewChartModel {
  name: string;
  series: ViewChartSeriesModel[]
}

export interface ViewChartSeriesModel {
  name: string;
  value: number;
}
