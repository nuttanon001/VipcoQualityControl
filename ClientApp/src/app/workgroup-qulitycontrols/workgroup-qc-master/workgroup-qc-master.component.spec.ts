import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupQcMasterComponent } from './workgroup-qc-master.component';

describe('WorkgroupQcMasterComponent', () => {
  let component: WorkgroupQcMasterComponent;
  let fixture: ComponentFixture<WorkgroupQcMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkgroupQcMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkgroupQcMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
