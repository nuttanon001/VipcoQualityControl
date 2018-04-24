import { TestBed, inject } from '@angular/core/testing';

import { RequireQualityControlService } from './require-qc.service';

describe('RequireQcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequireQualityControlService]
    });
  });

  it('should be created', inject([RequireQualityControlService], (service: RequireQualityControlService) => {
    expect(service).toBeTruthy();
  }));
});
