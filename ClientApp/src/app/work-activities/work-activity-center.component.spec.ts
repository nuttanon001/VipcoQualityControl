import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkActivityCenterComponent } from './work-activity-center.component';

describe('WorkActivityCenterComponent', () => {
  let component: WorkActivityCenterComponent;
  let fixture: ComponentFixture<WorkActivityCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkActivityCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkActivityCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
