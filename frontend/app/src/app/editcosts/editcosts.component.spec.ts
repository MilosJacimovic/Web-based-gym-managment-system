import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcostsComponent } from './editcosts.component';

describe('EditcostsComponent', () => {
  let component: EditcostsComponent;
  let fixture: ComponentFixture<EditcostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
