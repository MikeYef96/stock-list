import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_INITIALIZER } from '@angular/core';
import { environment } from './environments/environment';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { stocksListReducer } from './app/stocks-list/store/stocks-list.reducer';
import { stockReducer } from './app/stock-page/store/stock.reducer';
import { StocksListEffects } from './app/stocks-list/store/stocks-list.effects';
import { StockEffects } from './app/stock-page/store/stock.effects';
import { ConfigService } from './app/services/config.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideStore({
      stocksList: stocksListReducer,
      stock: stockReducer,
    }),
    provideEffects([StocksListEffects, StockEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () => configService.loadConfig(),
      deps: [ConfigService],
      multi: true,
    },
  ],
}).catch(err => console.error(err));
