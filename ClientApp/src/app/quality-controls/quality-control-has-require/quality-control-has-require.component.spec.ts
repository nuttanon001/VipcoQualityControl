import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityControlHasRequireComponent } from './quality-control-has-require.component';

describe('QualityControlHasRequireComponent', () => {
  let component: QualityControlHasRequireComponent;
  let fixture: ComponentFixture<QualityControlHasRequireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityControlHasRequireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlHasRequireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
