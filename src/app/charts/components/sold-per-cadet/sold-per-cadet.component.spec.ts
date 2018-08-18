import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldPerCadetComponent } from './sold-per-cadet.component';

describe('SoldPerCadetComponent', () => {
  let component: SoldPerCadetComponent;
  let fixture: ComponentFixture<SoldPerCadetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldPerCadetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldPerCadetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
