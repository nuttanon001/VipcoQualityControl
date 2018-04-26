import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireQcMasterlistTableComponent } from './require-qc-masterlist-table.component';

describe('RequireQcMasterlistTableComponent', () => {
  let component: RequireQcMasterlistTableComponent;
  let fixture: ComponentFixture<RequireQcMasterlistTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequireQcMasterlistTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireQcMasterlistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
