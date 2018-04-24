import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkActivityEditComponent } from './work-activity-edit.component';

describe('WorkActivityEditComponent', () => {
  let component: WorkActivityEditComponent;
  let fixture: ComponentFixture<WorkActivityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkActivityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkActivityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
