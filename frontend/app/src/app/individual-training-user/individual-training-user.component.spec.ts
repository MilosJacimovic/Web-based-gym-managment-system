import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTrainingUserComponent } from './individual-training-user.component';

describe('IndividualTrainingUserComponent', () => {
  let component: IndividualTrainingUserComponent;
  let fixture: ComponentFixture<IndividualTrainingUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualTrainingUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualTrainingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
