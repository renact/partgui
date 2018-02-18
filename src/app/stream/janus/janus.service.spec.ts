import { TestBed, inject } from '@angular/core/testing';

import { JanusService } from './janus.service';

describe('JanusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JanusService]
    });
  });

  it('should be created', inject([JanusService], (service: JanusService) => {
    expect(service).toBeTruthy();
  }));
});
