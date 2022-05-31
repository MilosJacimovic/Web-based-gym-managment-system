import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrscanerprobaComponent } from './qrscanerproba.component';

describe('QrscanerprobaComponent', () => {
  let component: QrscanerprobaComponent;
  let fixture: ComponentFixture<QrscanerprobaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrscanerprobaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrscanerprobaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
