import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatePickupTableComponent } from './plate-pickup-table.component';

describe('PlatePickupTableComponent', () => {
  let component: PlatePickupTableComponent;
  let fixture: ComponentFixture<PlatePickupTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatePickupTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatePickupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
