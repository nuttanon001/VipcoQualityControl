import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireQcDialogComponent } from './require-qc-dialog.component';

describe('RequireQcDialogComponent', () => {
  let component: RequireQcDialogComponent;
  let fixture: ComponentFixture<RequireQcDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequireQcDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireQcDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
