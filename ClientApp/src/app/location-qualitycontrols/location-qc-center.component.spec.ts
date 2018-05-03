import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationQcCenterComponent } from './location-qc-center.component';

describe('LocationQcCenterComponent', () => {
  let component: LocationQcCenterComponent;
  let fixture: ComponentFixture<LocationQcCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationQcCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationQcCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
