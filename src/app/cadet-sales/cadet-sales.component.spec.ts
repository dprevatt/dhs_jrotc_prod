import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetSalesComponent } from './cadet-sales.component';

describe('CadetSalesComponent', () => {
  let component: CadetSalesComponent;
  let fixture: ComponentFixture<CadetSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
