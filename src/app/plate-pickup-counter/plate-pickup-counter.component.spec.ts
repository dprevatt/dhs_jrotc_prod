import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatePickupCounterComponent } from './plate-pickup-counter.component';

describe('PlatePickupCounterComponent', () => {
  let component: PlatePickupCounterComponent;
  let fixture: ComponentFixture<PlatePickupCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatePickupCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatePickupCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
