import { TestBed } from '@angular/core/testing';

import { EdamamApiService } from './edamam-api.service';

describe('EdamamApiService', () => {
  let service: EdamamApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdamamApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
