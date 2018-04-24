import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireQcViewComponent } from './require-qc-view.component';

describe('RequireQcViewComponent', () => {
  let component: RequireQcViewComponent;
  let fixture: ComponentFixture<RequireQcViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequireQcViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireQcViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
