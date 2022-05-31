import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerpanelComponent } from './trainerpanel.component';

describe('TrainerpanelComponent', () => {
  let component: TrainerpanelComponent;
  let fixture: ComponentFixture<TrainerpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
