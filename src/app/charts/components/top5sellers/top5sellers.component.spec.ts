import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top5sellersComponent } from './top5sellers.component';

describe('Top5sellersComponent', () => {
  let component: Top5sellersComponent;
  let fixture: ComponentFixture<Top5sellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top5sellersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top5sellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
