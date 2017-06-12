import { TestBed, inject } from '@angular/core/testing';

import { RecipebookService } from '../shared/recipebook.service';

describe('RecipebookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipebookService]
    });
  });

  it('should be created', inject([RecipebookService], (service: RecipebookService) => {
    expect(service).toBeTruthy();
  }));
});
