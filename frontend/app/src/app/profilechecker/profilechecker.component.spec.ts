import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecheckerComponent } from './profilechecker.component';

describe('ProfilecheckerComponent', () => {
  let component: ProfilecheckerComponent;
  let fixture: ComponentFixture<ProfilecheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilecheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilecheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
