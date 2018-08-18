import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BravoSellersTableComponent } from './bravo-sellers-table.component';

describe('BravoSellersTableComponent', () => {
  let component: BravoSellersTableComponent;
  let fixture: ComponentFixture<BravoSellersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BravoSellersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BravoSellersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
