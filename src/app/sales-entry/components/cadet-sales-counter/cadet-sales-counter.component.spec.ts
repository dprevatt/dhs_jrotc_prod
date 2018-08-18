import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetSalesCounterComponent } from './cadet-sales-counter.component';

describe('CadetSalesCounterComponent', () => {
  let component: CadetSalesCounterComponent;
  let fixture: ComponentFixture<CadetSalesCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetSalesCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetSalesCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
