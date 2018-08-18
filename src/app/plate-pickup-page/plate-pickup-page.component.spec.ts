import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatePickupPageComponent } from './plate-pickup-page.component';

describe('PlatePickupPageComponent', () => {
  let component: PlatePickupPageComponent;
  let fixture: ComponentFixture<PlatePickupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatePickupPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatePickupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
