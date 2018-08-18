import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeltaSellersTableComponent } from './delta-sellers-table.component';

describe('DeltaSellersTableComponent', () => {
  let component: DeltaSellersTableComponent;
  let fixture: ComponentFixture<DeltaSellersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeltaSellersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeltaSellersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
