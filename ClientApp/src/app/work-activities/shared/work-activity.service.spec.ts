import { TestBed, inject } from '@angular/core/testing';

import { WorkActivityService } from './work-activity.service';

describe('WorkActivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkActivityService]
    });
  });

  it('should be created', inject([WorkActivityService], (service: WorkActivityService) => {
    expect(service).toBeTruthy();
  }));
});
