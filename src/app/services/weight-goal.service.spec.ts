import { TestBed } from '@angular/core/testing';

import { WeightGoalService } from './weight-goal.service';

describe('WeightGoalService', () => {
  let service: WeightGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
