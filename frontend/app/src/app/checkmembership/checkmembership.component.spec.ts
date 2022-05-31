import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckmembershipComponent } from './checkmembership.component';

describe('CheckmembershipComponent', () => {
  let component: CheckmembershipComponent;
  let fixture: ComponentFixture<CheckmembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckmembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckmembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
