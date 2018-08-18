import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaSellersTableComponent } from './alpha-sellers-table.component';

describe('AlphaSellersTableComponent', () => {
  let component: AlphaSellersTableComponent;
  let fixture: ComponentFixture<AlphaSellersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlphaSellersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphaSellersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
