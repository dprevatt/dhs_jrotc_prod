import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharlieSellersTableComponent } from './charlie-sellers-table.component';

describe('CharlieSellersTableComponent', () => {
  let component: CharlieSellersTableComponent;
  let fixture: ComponentFixture<CharlieSellersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharlieSellersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharlieSellersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
