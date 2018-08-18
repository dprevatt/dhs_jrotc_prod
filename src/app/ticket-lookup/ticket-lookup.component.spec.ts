import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketLookupComponent } from './ticket-lookup.component';

describe('TicketLookupComponent', () => {
  let component: TicketLookupComponent;
  let fixture: ComponentFixture<TicketLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
