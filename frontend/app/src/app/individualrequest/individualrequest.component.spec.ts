import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualrequestComponent } from './individualrequest.component';

describe('IndividualrequestComponent', () => {
  let component: IndividualrequestComponent;
  let fixture: ComponentFixture<IndividualrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
