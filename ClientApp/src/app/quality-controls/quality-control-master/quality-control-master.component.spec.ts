import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityControlMasterComponent } from './quality-control-master.component';

describe('QualityControlMasterComponent', () => {
  let component: QualityControlMasterComponent;
  let fixture: ComponentFixture<QualityControlMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
