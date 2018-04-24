import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireQcMasterComponent } from './require-qc-master.component';

describe('RequireQcMasterComponent', () => {
  let component: RequireQcMasterComponent;
  let fixture: ComponentFixture<RequireQcMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequireQcMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireQcMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
