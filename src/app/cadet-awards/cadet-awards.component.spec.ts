import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetAwardsComponent } from './cadet-awards.component';

describe('CadetAwardsComponent', () => {
  let component: CadetAwardsComponent;
  let fixture: ComponentFixture<CadetAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
