import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPersonalComponent } from './registrar-personal.component';

describe('RegistrarPersonalComponent', () => {
  let component: RegistrarPersonalComponent;
  let fixture: ComponentFixture<RegistrarPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
