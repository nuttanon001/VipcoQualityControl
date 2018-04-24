import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkActivityViewComponent } from './work-activity-view.component';

describe('WorkActivityViewComponent', () => {
  let component: WorkActivityViewComponent;
  let fixture: ComponentFixture<WorkActivityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkActivityViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkActivityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
