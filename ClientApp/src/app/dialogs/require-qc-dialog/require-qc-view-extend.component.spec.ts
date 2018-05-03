import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireQcViewExtendComponent } from './require-qc-view-extend.component';

describe('RequireQcViewExtendComponent', () => {
  let component: RequireQcViewExtendComponent;
  let fixture: ComponentFixture<RequireQcViewExtendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequireQcViewExtendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireQcViewExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
