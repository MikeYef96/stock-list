import { Component, OnDestroy } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
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
  styleUrls: ['./stocks-list.component.scss']
})
export class StocksListComponent implements OnDestroy {

  displayedColumns: string[] = tableColumns;
  dataSource!: MatTableDataSource<StockListModel>;

  subscription$ = new Subject();

  constructor(public storeStockList: Store<StocksListState>) {
    this.storeStockList.dispatch(stockList());
    this.storeStockList.select(selectStocksList)
      .pipe(
        takeUntil(this.subscription$),
        filter((stocks: StockListModel[]) => Boolean(stocks))
      )
      .subscribe((stocks: StockListModel[]) => this.dataSource = new MatTableDataSource(stocks))
  }

  ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

}
