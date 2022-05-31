import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeprofilepicComponent } from './changeprofilepic.component';

describe('ChangeprofilepicComponent', () => {
  let component: ChangeprofilepicComponent;
  let fixture: ComponentFixture<ChangeprofilepicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeprofilepicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeprofilepicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
