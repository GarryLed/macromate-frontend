import { TestBed } from '@angular/core/testing';

import { MealLogService } from './meal-log.service';

describe('MealLogService', () => {
  let service: MealLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
