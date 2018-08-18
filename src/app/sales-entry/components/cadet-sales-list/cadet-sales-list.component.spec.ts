import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetSalesListComponent } from './cadet-sales-list.component';

describe('CadetSalesListComponent', () => {
  let component: CadetSalesListComponent;
  let fixture: ComponentFixture<CadetSalesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetSalesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetSalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
