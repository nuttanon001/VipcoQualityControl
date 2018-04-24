import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireQcEditComponent } from './require-qc-edit.component';

describe('RequireQcEditComponent', () => {
  let component: RequireQcEditComponent;
  let fixture: ComponentFixture<RequireQcEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequireQcEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireQcEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
