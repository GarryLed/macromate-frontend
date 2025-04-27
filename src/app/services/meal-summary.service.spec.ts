import { TestBed } from '@angular/core/testing';

import { MealSummaryService } from './meal-summary.service';

describe('MealSummaryService', () => {
  let service: MealSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
