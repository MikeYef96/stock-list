import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { StockPageComponent } from './stock-page.component';
import { ChartComponent } from './components/chart/chart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    StockPageComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxChartsModule,
    MatProgressSpinnerModule,
  ]
})
export class StockPageModule { }
