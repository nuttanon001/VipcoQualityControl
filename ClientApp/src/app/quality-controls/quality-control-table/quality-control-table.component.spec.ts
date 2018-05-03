import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityControlTableComponent } from './quality-control-table.component';

describe('QualityControlTableComponent', () => {
  let component: QualityControlTableComponent;
  let fixture: ComponentFixture<QualityControlTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
