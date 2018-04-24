import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkActivityTableComponent } from './work-activity-table.component';

describe('WorkActivityTableComponent', () => {
  let component: WorkActivityTableComponent;
  let fixture: ComponentFixture<WorkActivityTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkActivityTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
