import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupQcTableComponent } from './workgroup-qc-table.component';

describe('WorkgroupQcTableComponent', () => {
  let component: WorkgroupQcTableComponent;
  let fixture: ComponentFixture<WorkgroupQcTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkgroupQcTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkgroupQcTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
