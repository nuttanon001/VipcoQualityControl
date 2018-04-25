import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterListMasterComponent } from './master-list-master.component';

describe('MasterListMasterComponent', () => {
  let component: MasterListMasterComponent;
  let fixture: ComponentFixture<MasterListMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterListMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterListMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
