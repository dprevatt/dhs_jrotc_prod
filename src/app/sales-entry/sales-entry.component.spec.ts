import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesEntryComponent } from './sales-entry.component';

describe('SalesEntryComponent', () => {
  let component: SalesEntryComponent;
  let fixture: ComponentFixture<SalesEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
