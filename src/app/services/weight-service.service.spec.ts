import { TestBed } from '@angular/core/testing';

import { WeightServiceService } from './weight-service.service';

describe('WeightServiceService', () => {
  let service: WeightServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
