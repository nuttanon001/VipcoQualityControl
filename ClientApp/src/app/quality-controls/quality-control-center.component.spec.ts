import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityControlCenterComponent } from './quality-control-center.component';

describe('QualityControlCenterComponent', () => {
  let component: QualityControlCenterComponent;
  let fixture: ComponentFixture<QualityControlCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
