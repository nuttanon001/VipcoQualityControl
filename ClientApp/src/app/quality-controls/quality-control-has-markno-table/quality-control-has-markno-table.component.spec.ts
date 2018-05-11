import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityControlHasMarknoTableComponent } from './quality-control-has-markno-table.component';

describe('QualityControlHasMarknoTableComponent', () => {
  let component: QualityControlHasMarknoTableComponent;
  let fixture: ComponentFixture<QualityControlHasMarknoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlHasMarknoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlHasMarknoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
