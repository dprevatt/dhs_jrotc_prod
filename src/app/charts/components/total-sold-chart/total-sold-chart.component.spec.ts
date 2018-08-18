import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSoldChartComponent } from './total-sold-chart.component';

describe('TotalSoldChartComponent', () => {
  let component: TotalSoldChartComponent;
  let fixture: ComponentFixture<TotalSoldChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalSoldChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSoldChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
