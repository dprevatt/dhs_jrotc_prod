import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldPerComapnyChartComponent } from './sold-per-comapny-chart.component';

describe('SoldPerComapnyChartComponent', () => {
  let component: SoldPerComapnyChartComponent;
  let fixture: ComponentFixture<SoldPerComapnyChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldPerComapnyChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldPerComapnyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
