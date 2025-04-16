import { TestBed } from '@angular/core/testing';

import { CalendarDayService } from './calendar-day.service';

describe('CalendarDayService', () => {
  let service: CalendarDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
