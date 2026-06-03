import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent],
      providers: [
        provideMockStore({
          initialState: {
            stock: {}
          }
        })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have chart configuration properties', () => {
    expect(component.view).toBeDefined();
    expect(component.legend).toBe(true);
    expect(component.animations).toBe(true);
    expect(component.colorScheme).toBeDefined();
  });

  it('should have getViewChartData method', () => {
    expect(typeof component.getViewChartData).toBe('function');
  });

  it('should have getSeries method', () => {
    expect(typeof component.getSeries).toBe('function');
  });

  it('should render ngx-charts element', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ngx-charts-area-chart')).toBeTruthy();
  });
});
