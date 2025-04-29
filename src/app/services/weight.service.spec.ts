import { TestBed } from '@angular/core/testing';

import { WeightService } from './weight.service';

describe('WeightServiceService', () => {
  let service: WeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
