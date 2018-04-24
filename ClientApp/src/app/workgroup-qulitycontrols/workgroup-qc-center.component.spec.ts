import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupQcCenterComponent } from './workgroup-qc-center.component';

describe('WorkgroupQcCenterComponent', () => {
  let component: WorkgroupQcCenterComponent;
  let fixture: ComponentFixture<WorkgroupQcCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkgroupQcCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkgroupQcCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
