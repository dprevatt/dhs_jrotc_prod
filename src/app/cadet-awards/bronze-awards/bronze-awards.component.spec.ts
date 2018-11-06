import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BronzeAwardsComponent } from './bronze-awards.component';

describe('BronzeAwardsComponent', () => {
  let component: BronzeAwardsComponent;
  let fixture: ComponentFixture<BronzeAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BronzeAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BronzeAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
