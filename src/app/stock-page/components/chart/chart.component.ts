import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as moment from 'moment';

import { StockState } from '../../store/stock.reducer';
import * as stockInfoSelectors from '../../store/stock.selectors';
import { ChartDataModel } from '../../interfaces/chart-data.model';
import { ViewChartModel, ViewChartSeriesModel } from '../../interfaces/view-chart.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnDestroy {

  multi!: ViewChartModel[];

  // options
  view: [number, number] = [800, 300];
  legend: boolean = true;
  legendTitle: string = 'Properties'
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Value';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  subscription$ = new Subject();

  constructor(private stockInfoStore: Store<StockState>) {
    this.stockInfoStore.select(stockInfoSelectors.selectStockChartData)
      .pipe(
        takeUntil(this.subscription$),
        filter(res => Boolean(res))
      )
      .subscribe((chartData: ChartDataModel[]) => this.multi = this.getViewChartData(chartData))
  }

  ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
  }

  getViewChartData(chartData: ChartDataModel[]): ViewChartModel[] {
    return [
      {
        name: "Adj. Close",
        series: this.getSeries(chartData, 'adjClose')
      },
      {
        name: "Close",
        series: this.getSeries(chartData, 'close')
      },
      {
        name: "High",
        series: this.getSeries(chartData, 'high')
      },
      {
        name: "Low",
        series: this.getSeries(chartData, 'low')
      },
      {
        name: "Open",
        series: this.getSeries(chartData, 'open')
      }
    ]
  }

  getSeries(chartData: ChartDataModel[], prop: string): ViewChartSeriesModel[] {
    return chartData.map((item: ChartDataModel) => ({
      name: moment(item.date).format('l'),
      // @ts-ignore
      value: item[prop]
    })).reverse()
  }

}
