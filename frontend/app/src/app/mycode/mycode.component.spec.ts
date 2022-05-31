import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycodeComponent } from './mycode.component';

describe('MycodeComponent', () => {
  let component: MycodeComponent;
  let fixture: ComponentFixture<MycodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
