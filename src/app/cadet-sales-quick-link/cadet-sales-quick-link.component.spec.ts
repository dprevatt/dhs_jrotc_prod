import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetSalesQuickLinkComponent } from './cadet-sales-quick-link.component';

describe('CadetSalesQuickLinkComponent', () => {
  let component: CadetSalesQuickLinkComponent;
  let fixture: ComponentFixture<CadetSalesQuickLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetSalesQuickLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetSalesQuickLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
