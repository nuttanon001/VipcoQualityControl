import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterListViewComponent } from './master-list-view.component';

describe('MasterListViewComponent', () => {
  let component: MasterListViewComponent;
  let fixture: ComponentFixture<MasterListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
