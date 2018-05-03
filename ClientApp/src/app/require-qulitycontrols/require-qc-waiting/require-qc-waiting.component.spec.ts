import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireQcWaitingComponent } from './require-qc-waiting.component';

describe('RequireQcWaitingComponent', () => {
  let component: RequireQcWaitingComponent;
  let fixture: ComponentFixture<RequireQcWaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequireQcWaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireQcWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
