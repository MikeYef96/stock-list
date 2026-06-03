import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/stocks-list',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: 'stocks-list',
        loadComponent: () => import('./stocks-list/stocks-list.component').then(m => m.StocksListComponent),
      },
      {
        path: 'stock-page',
        loadComponent: () => import('./stock-page/stock-page.component').then(m => m.StockPageComponent),
      }
    ]
  },
];
