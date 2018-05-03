import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityControlViewComponent } from './quality-control-view.component';

describe('QualityControlViewComponent', () => {
  let component: QualityControlViewComponent;
  let fixture: ComponentFixture<QualityControlViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
