import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupQcEditComponent } from './workgroup-qc-edit.component';

describe('WorkgroupQcEditComponent', () => {
  let component: WorkgroupQcEditComponent;
  let fixture: ComponentFixture<WorkgroupQcEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkgroupQcEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkgroupQcEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
