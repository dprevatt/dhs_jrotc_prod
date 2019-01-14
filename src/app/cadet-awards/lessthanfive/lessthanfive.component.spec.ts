import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessthanfiveComponent } from './lessthanfive.component';

describe('LessthanfiveComponent', () => {
  let component: LessthanfiveComponent;
  let fixture: ComponentFixture<LessthanfiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessthanfiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessthanfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
