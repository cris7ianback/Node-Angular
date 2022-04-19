import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarInventarioComponent } from './ingresar-inventario.component';

describe('IngresarInventarioComponent', () => {
  let component: IngresarInventarioComponent;
  let fixture: ComponentFixture<IngresarInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
