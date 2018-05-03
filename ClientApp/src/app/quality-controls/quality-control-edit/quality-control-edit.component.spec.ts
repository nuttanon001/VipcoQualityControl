import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityControlEditComponent } from './quality-control-edit.component';

describe('QualityControlEditComponent', () => {
  let component: QualityControlEditComponent;
  let fixture: ComponentFixture<QualityControlEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
