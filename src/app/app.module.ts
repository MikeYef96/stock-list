import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { StockListApiService } from './stocks-list/services/stock-list-api.service';
import { AppRoutingModule } from './app-routing.module';
import { StocksListEffects } from './stocks-list/store/stocks-list.effects';
import { StockPageModule } from './stock-page/stock-page.module';
import { StocksListModule } from './stocks-list/stocks-list.module';
import { StockEffects } from './stock-page/store/stock.effects';
import { DashboardModule } from './dashboard/dashboard.module';
import { stocksListReducer } from './stocks-list/store/stocks-list.reducer';
import { stockReducer } from './stock-page/store/stock.reducer';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    StockPageModule,
    StocksListModule,
    DashboardModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    StoreModule.forRoot({
      stocksList: stocksListReducer,
      stock: stockReducer,
    }),
    EffectsModule.forRoot([StocksListEffects, StockEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
