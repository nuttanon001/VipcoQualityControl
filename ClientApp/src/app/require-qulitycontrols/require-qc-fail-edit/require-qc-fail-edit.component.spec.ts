import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireQcFailEditComponent } from './require-qc-fail-edit.component';

describe('RequireQcFailEditComponent', () => {
  let component: RequireQcFailEditComponent;
  let fixture: ComponentFixture<RequireQcFailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequireQcFailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireQcFailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
