import { TestBed } from '@angular/core/testing';

import { CostumeInterceptor } from './costume.interceptor';

describe('CostumeInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CostumeInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CostumeInterceptor = TestBed.inject(CostumeInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
