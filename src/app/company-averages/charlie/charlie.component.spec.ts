import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharlieComponent } from './charlie.component';

describe('CharlieComponent', () => {
  let component: CharlieComponent;
  let fixture: ComponentFixture<CharlieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharlieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharlieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
