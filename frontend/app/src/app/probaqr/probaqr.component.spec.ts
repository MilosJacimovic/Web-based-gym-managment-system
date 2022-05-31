import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbaqrComponent } from './probaqr.component';

describe('ProbaqrComponent', () => {
  let component: ProbaqrComponent;
  let fixture: ComponentFixture<ProbaqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbaqrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbaqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
