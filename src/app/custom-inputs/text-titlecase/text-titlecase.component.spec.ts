import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTitlecaseComponent } from './text-titlecase.component';

describe('TextTitlecaseComponent', () => {
  let component: TextTitlecaseComponent;
  let fixture: ComponentFixture<TextTitlecaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextTitlecaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextTitlecaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
