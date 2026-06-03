import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBarComponent } from './side-bar.component';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have sideBarList populated', () => {
    expect(component.sideBarList).toBeDefined();
    expect(component.sideBarList.length).toBeGreaterThan(0);
  });

  it('should render mat-list', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-list')).toBeTruthy();
  });

  it('should render menu items in mat-list-items', () => {
    const compiled = fixture.nativeElement;
    const listItems = compiled.querySelectorAll('mat-list-item');
    expect(listItems.length).toBe(component.sideBarList.length);
  });
});
