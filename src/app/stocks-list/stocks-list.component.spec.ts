import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { StocksListComponent } from './stocks-list.component';

describe('StocksListComponent', () => {
  let component: StocksListComponent;
  let fixture: ComponentFixture<StocksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StocksListComponent],
      providers: [
        provideMockStore({
          initialState: {
            stocksList: []
          }
        })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StocksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have displayedColumns array', () => {
    expect(component.displayedColumns).toBeDefined();
    expect(Array.isArray(component.displayedColumns)).toBeTruthy();
  });

  it('should render table element', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('table')).toBeTruthy();
  });

  it('should have applyFilter method', () => {
    expect(typeof component.applyFilter).toBe('function');
  });

  it('should have navigateToStock method', () => {
    expect(typeof component.navigateToStock).toBe('function');
  });
});
