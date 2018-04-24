import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionMasterComponent } from './inspection-master.component';

describe('InspectionMasterComponent', () => {
  let component: InspectionMasterComponent;
  let fixture: ComponentFixture<InspectionMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
