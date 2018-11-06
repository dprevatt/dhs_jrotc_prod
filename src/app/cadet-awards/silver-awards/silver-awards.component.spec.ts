import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SilverAwardsComponent } from './silver-awards.component';

describe('SilverAwardsComponent', () => {
  let component: SilverAwardsComponent;
  let fixture: ComponentFixture<SilverAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SilverAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SilverAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
