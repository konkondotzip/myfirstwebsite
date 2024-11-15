import { TestBed } from '@angular/core/testing';

import { StopwatchService } from './stopwatch.service';

describe('HighscoreService', () => {
  let service: StopwatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StopwatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
