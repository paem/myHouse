import { TestBed, inject } from '@angular/core/testing';

import { GoogleSearchService } from './google-search.service';

describe('GoogleSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleSearchService]
    });
  });

  it('should be created', inject([GoogleSearchService], (service: GoogleSearchService) => {
    expect(service).toBeTruthy();
  }));
});
