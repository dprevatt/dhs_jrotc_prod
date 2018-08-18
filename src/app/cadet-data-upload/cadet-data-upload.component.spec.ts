import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetDataUploadComponent } from './cadet-data-upload.component';

describe('CadetDataUploadComponent', () => {
  let component: CadetDataUploadComponent;
  let fixture: ComponentFixture<CadetDataUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetDataUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetDataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
