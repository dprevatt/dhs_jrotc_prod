import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetManagementComponent } from './cadet-management.component';

describe('CadetManagementComponent', () => {
  let component: CadetManagementComponent;
  let fixture: ComponentFixture<CadetManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
