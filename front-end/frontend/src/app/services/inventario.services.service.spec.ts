import { TestBed } from '@angular/core/testing';

import { Inventario.ServicesService } from './inventario.service';

describe('Inventario.ServicesService', () => {
  let service: Inventario.ServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Inventario.ServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
