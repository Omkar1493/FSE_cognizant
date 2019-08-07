/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserAddService } from './userAdd.service';

describe('Service: UserAdd', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAddService]
    });
  });

  it('should ...', inject([UserAddService], (service: UserAddService) => {
    expect(service).toBeTruthy();
  }));
});
