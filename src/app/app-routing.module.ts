import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StocksListComponent } from './stocks-list/stocks-list.component';
import { StockPageComponent } from './stock-page/stock-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/stocks-list',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'stocks-list',
        component: StocksListComponent,
      },
      {
        path: 'stock-page',
        component: StockPageComponent,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
