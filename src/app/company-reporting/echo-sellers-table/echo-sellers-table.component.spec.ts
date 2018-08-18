import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchoSellersTableComponent } from './echo-sellers-table.component';

describe('EchoSellersTableComponent', () => {
  let component: EchoSellersTableComponent;
  let fixture: ComponentFixture<EchoSellersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchoSellersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchoSellersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
