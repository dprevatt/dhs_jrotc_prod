import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top25sellersComponent } from './top25sellers.component';

describe('Top25sellersComponent', () => {
  let component: Top25sellersComponent;
  let fixture: ComponentFixture<Top25sellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top25sellersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top25sellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
