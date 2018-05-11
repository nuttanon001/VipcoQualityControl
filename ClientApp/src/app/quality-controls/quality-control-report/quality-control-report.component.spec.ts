import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityControlReportComponent } from './quality-control-report.component';

describe('QualityControlReportComponent', () => {
  let component: QualityControlReportComponent;
  let fixture: ComponentFixture<QualityControlReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
