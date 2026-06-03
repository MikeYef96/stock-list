import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import dayjs from 'dayjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { StockState } from '../../store/stock.reducer';
import * as stockInfoSelectors from '../../store/stock.selectors';
import { ChartDataModel } from '../../interfaces/chart-data.model';
import { ViewChartModel, ViewChartSeriesModel } from '../../interfaces/view-chart.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
  multi!: ViewChartModel[];

  // options
  view: [number, number] = [1200, 500];
  legend: boolean = true;
  legendTitle: string = 'Properties';
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Value';
  timeline: boolean = true;

  colorScheme: any = {
    domain: ['#9afa41', '#cb23f5', '#419aff', '#ffae00', '#fd156e', '#6f00ff']
  };

  subscription$ = new Subject<void>();

  constructor(private stockInfoStore: Store<StockState>) {
    this.stockInfoStore.select(stockInfoSelectors.selectStockChartData)
      .pipe(
        takeUntil(this.subscription$),
        filter(res => Boolean(res) && Array.isArray(res) && res.length > 0)
      )
      .subscribe((chartData: ChartDataModel[]) => {
        console.log(chartData);
        this.multi = this.getViewChartData(chartData);
      });
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
    ];
  }

  getSeries(chartData: ChartDataModel[], prop: string): ViewChartSeriesModel[] {
    return chartData
      .filter((item: ChartDataModel) => item && item.date && item[prop as keyof ChartDataModel] !== undefined)
      .map((item: ChartDataModel) => ({
        name: dayjs(item.date).format('YYYY-MM-DD'),
        value: Number(item[prop as keyof ChartDataModel]) || 0
      }))
      .reverse();
  }
}
