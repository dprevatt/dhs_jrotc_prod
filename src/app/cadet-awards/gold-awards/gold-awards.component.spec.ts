import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldAwardsComponent } from './gold-awards.component';

describe('GoldAwardsComponent', () => {
  let component: GoldAwardsComponent;
  let fixture: ComponentFixture<GoldAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
