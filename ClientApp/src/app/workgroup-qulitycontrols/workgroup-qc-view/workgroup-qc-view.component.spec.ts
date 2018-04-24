import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupQcViewComponent } from './workgroup-qc-view.component';

describe('WorkgroupQcViewComponent', () => {
  let component: WorkgroupQcViewComponent;
  let fixture: ComponentFixture<WorkgroupQcViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkgroupQcViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkgroupQcViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
