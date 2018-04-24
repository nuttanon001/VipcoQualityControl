import { TestBed, inject } from '@angular/core/testing';

import { InspectionPointService } from './inspection-point.service';

describe('InspectionPointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionPointService]
    });
  });

  it('should be created', inject([InspectionPointService], (service: InspectionPointService) => {
    expect(service).toBeTruthy();
  }));
});
