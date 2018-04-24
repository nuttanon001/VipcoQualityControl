import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireQcCenterComponent } from './require-qc-center.component';

describe('RequireQcCenterComponent', () => {
  let component: RequireQcCenterComponent;
  let fixture: ComponentFixture<RequireQcCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequireQcCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireQcCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
