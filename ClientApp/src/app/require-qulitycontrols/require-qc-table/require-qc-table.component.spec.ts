import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireQcTableComponent } from './require-qc-table.component';

describe('RequireQcTableComponent', () => {
  let component: RequireQcTableComponent;
  let fixture: ComponentFixture<RequireQcTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequireQcTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireQcTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
