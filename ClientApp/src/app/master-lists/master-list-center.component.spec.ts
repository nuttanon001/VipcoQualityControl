import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterListCenterComponent } from './master-list-center.component';

describe('MasterListCenterComponent', () => {
  let component: MasterListCenterComponent;
  let fixture: ComponentFixture<MasterListCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterListCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterListCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
