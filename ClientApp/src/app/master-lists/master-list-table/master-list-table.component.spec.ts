import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterListTableComponent } from './master-list-table.component';

describe('MasterListTableComponent', () => {
  let component: MasterListTableComponent;
  let fixture: ComponentFixture<MasterListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
