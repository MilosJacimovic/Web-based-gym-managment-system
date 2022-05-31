import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtrainingsComponent } from './gtrainings.component';

describe('GtrainingsComponent', () => {
  let component: GtrainingsComponent;
  let fixture: ComponentFixture<GtrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GtrainingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GtrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
