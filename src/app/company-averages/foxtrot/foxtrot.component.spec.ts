import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxtrotComponent } from './foxtrot.component';

describe('FoxtrotComponent', () => {
  let component: FoxtrotComponent;
  let fixture: ComponentFixture<FoxtrotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoxtrotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxtrotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
