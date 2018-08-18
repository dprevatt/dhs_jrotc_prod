import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetSalesEntryComponent } from './cadet-sales-entry.component';

describe('CadetSalesEntryComponent', () => {
  let component: CadetSalesEntryComponent;
  let fixture: ComponentFixture<CadetSalesEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetSalesEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetSalesEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
