import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireQcChangeDialogComponent } from './require-qc-change-dialog.component';

describe('RequireQcChangeDialogComponent', () => {
  let component: RequireQcChangeDialogComponent;
  let fixture: ComponentFixture<RequireQcChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequireQcChangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireQcChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
