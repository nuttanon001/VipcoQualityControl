import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkActivityMasterComponent } from './work-activity-master.component';

describe('WorkActivityMasterComponent', () => {
  let component: WorkActivityMasterComponent;
  let fixture: ComponentFixture<WorkActivityMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkActivityMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkActivityMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
