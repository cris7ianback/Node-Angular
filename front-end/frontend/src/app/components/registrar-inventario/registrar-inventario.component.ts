import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventarioServices } from 'src/app/services/inventario.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registrar-inventario',
  templateUrl: './registrar-inventario.component.html',
  styleUrls: ['./registrar-inventario.component.css']
})
export class RegistrarInventarioComponent implements OnInit {



  formAgInventario !: FormGroup;

  constructor(private inventarioServices: InventarioServices,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<RegistrarInventarioComponent>) { }

  ngOnInit(): void {

    this.formAgInventario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      cantidad: ['', [Validators.required, Validators.minLength(1)]],
      unidad: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  campoEsValido(campo: string) {
    return this.formAgInventario.controls[campo].errors
      && this.formAgInventario.controls[campo].touched;
  }
  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['/listarInventario']);
  }

  registrarInventario(): void {
    if (this.formAgInventario.valid) {
      this.inventarioServices.registrarInventario(this.formAgInventario.value)
        .subscribe({
          next: (res) => { },
          error: (err) => {
            if (err.status === 200) {
              this.toast.success({
                detail: "Producto Registrado",
                summary: "Producto Registrado con Exito",
                duration: 3000,
                position: 'br'
              })
              this.formAgInventario.reset();
              this.dialogRef.close('Registrar Producto')
            } else {
              this.toast.error({
                detail: "Atención",
                summary: "Producto ya se encuentra Registrado",
                duration: 3000,
                position: 'br'
              })
            }
          }
        }
        )
    }
  }
}