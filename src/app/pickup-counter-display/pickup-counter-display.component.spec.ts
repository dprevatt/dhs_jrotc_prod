import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupCounterDisplayComponent } from './pickup-counter-display.component';

describe('PickupCounterDisplayComponent', () => {
  let component: PickupCounterDisplayComponent;
  let fixture: ComponentFixture<PickupCounterDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupCounterDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupCounterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
