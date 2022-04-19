import { Component, Inject, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventarioServices } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-modificar-inventario',
  templateUrl: './modificar-inventario.component.html',
  styleUrls: ['./modificar-inventario.component.css']
})
export class ModificarInventarioComponent implements OnInit {

  private URL = 'http://localhost:3000/'
  estado?: boolean;

  formModInventario!: FormGroup;


  constructor(private inventarioServices: InventarioServices,
    private router: Router,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<ModificarInventarioComponent>) {

    this.formModInventario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3),]],
      cantidad: ['', [Validators.required, Validators.minLength(3),]],
      unidad: ['', [Validators.required, Validators.minLength(3)]]
    });

    if (this.editData) {
      this.formModInventario.controls['nombre'].setValue(this.editData.nombre);
      this.formModInventario.controls['cantidad'].setValue(this.editData.cantidad);
      this.formModInventario.controls['unidad'].setValue(this.editData.unidad);
    }
  }

  actualizarInventario() {
    this.inventarioServices.modificarInventario(this.formModInventario.value, this.editData.id_inventario)
      .subscribe({
        next: (res) => {
          this.toast.success({
            detail: "Producto Modificado",
            summary: "Producto Modificado con Exito",
            duration: 3000,
            position: 'br'
          })

          this.formModInventario.reset();
          this.dialogRef.close('Modificar Producto')
        },
        error: () => {
          this.toast.error({
            detail: "Error de Solicitud",
            summary: "Error al modificar Inventario",
            duration: 3000,
            position: 'br'
          })
        }


      })
  }


  ngOnInit(): void {
  }

  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['listarInventario']);
  }
}





