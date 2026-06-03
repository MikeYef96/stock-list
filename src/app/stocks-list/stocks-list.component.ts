import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { StockListModel } from './interfaces/stock-model.interface';
import { selectStocksList } from './store/stocks-list.selectors';
import { StocksListState } from './store/stocks-list.reducer';
import { stockList } from './store/stocks-list.actions';
import { tableColumns } from './constants/stock-list.constants';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StocksListComponent {
  displayedColumns: string[] = tableColumns;
  dataSource: MatTableDataSource<StockListModel> = new MatTableDataSource<StockListModel>();
  subscription$ = new Subject<void>();

  constructor(
    public storeStockList: Store<StocksListState>,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.storeStockList.dispatch(stockList());
    this.storeStockList.select(selectStocksList)
      .pipe(
        takeUntil(this.subscription$),
        filter((stocks: StockListModel[]) => Boolean(stocks))
      )
      .subscribe((stocks: StockListModel[]) => {
        this.dataSource = new MatTableDataSource(stocks);
        this.cdr.markForCheck();
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  navigateToStock(symbol: string) {
    this.router.navigate(['/dashboard/stock-page'], { queryParams: { symbol } });
  }
}
