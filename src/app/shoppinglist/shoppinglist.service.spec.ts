import { TestBed, inject } from '@angular/core/testing';

import { ShoppinglistService } from '../shared/shoppinglist.service';

describe('ShoppinglistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppinglistService]
    });
  });

  it('should be created', inject([ShoppinglistService], (service: ShoppinglistService) => {
    expect(service).toBeTruthy();
  }));
});
