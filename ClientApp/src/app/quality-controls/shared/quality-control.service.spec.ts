import { TestBed, inject } from '@angular/core/testing';

import { QualityControlService } from './quality-control.service';

describe('QualityControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QualityControlService]
    });
  });

  it('should be created', inject([QualityControlService], (service: QualityControlService) => {
    expect(service).toBeTruthy();
  }));
});
