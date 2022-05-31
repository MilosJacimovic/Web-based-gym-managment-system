import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureprofilepictureComponent } from './captureprofilepicture.component';

describe('CaptureprofilepictureComponent', () => {
  let component: CaptureprofilepictureComponent;
  let fixture: ComponentFixture<CaptureprofilepictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptureprofilepictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureprofilepictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
