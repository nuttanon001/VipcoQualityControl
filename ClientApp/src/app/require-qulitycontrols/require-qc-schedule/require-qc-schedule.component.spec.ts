import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireQcScheduleComponent } from './require-qc-schedule.component';

describe('RequireQcScheduleComponent', () => {
  let component: RequireQcScheduleComponent;
  let fixture: ComponentFixture<RequireQcScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequireQcScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireQcScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
