import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTrainerComponent } from './group-trainer.component';

describe('GroupTrainerComponent', () => {
  let component: GroupTrainerComponent;
  let fixture: ComponentFixture<GroupTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
