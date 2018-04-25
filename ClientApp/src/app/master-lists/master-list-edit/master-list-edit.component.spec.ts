import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterListEditComponent } from './master-list-edit.component';

describe('MasterListEditComponent', () => {
  let component: MasterListEditComponent;
  let fixture: ComponentFixture<MasterListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
