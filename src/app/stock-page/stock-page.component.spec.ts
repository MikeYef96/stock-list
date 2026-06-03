import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { StockPageComponent } from './stock-page.component';
import { StockApiService } from './services/stock-api.service';

describe('StockPageComponent', () => {
  let component: StockPageComponent;
  let fixture: ComponentFixture<StockPageComponent>;
  let stockApiService: StockApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockPageComponent],
      providers: [
        StockApiService,
        provideMockStore({
          initialState: {
            stock: {}
          }
        })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StockPageComponent);
    component = fixture.componentInstance;
    stockApiService = TestBed.inject(StockApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have stockDataLoaded$ observable getter', () => {
    expect(component.stockDataLoaded$).toBeDefined();
  });

  it('should render app-chart component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-chart')).toBeTruthy();
  });

  it('should have subscription$ subject', () => {
    expect(component.subscription$).toBeDefined();
  });
});
