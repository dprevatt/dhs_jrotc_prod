import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatinumAwardsComponent } from './platinum-awards.component';

describe('PlatinumAwardsComponent', () => {
  let component: PlatinumAwardsComponent;
  let fixture: ComponentFixture<PlatinumAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatinumAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatinumAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
