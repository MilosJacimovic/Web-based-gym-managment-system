import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTrainerPageComponent } from './individual-trainer-page.component';

describe('IndividualTrainerPageComponent', () => {
  let component: IndividualTrainerPageComponent;
  let fixture: ComponentFixture<IndividualTrainerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualTrainerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualTrainerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
