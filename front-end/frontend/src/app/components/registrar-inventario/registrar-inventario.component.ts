import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventarioServices } from 'src/app/services/inventario.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-registrar-inventario',
  templateUrl: './registrar-inventario.component.html',
  styleUrls: ['./registrar-inventario.component.css']
})
export class RegistrarInventarioComponent implements OnInit {

  public previsualizacion?: string;
  public archivos: any = [];


  formAgInventario !: FormGroup;

  constructor(private inventarioServices: InventarioServices,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<RegistrarInventarioComponent>,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.formAgInventario = this.fb.group({
      nombre: ['test', [Validators.required, Validators.minLength(3)]],
      cantidad: ['', [Validators.required, Validators.minLength(1)]],
      unidad: ['', [Validators.required, Validators.minLength(3)]],
      imagenes: ['', [Validators.required]],
    })
  }



  capturarFile(event: any) {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log('ESTO ES BASE',imagen.base)
      const imagenes = imagen.base.split(",")[1]
      this.formAgInventario.value.imagenes = imagenes
      console.log('ESTO ES EL FORMULARIO',this.formAgInventario.value.imagenes)
      console.log(imagen);
    });
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
   
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const imagen = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      console.log('HOLA ESTO ES: '+reader)
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      //return null;
    }
  })

  registrarInventario(): void {
    if (this.formAgInventario.valid) {
      this.inventarioServices.registrarInventario(this.formAgInventario.value)
        .subscribe({
          next: (res) => {
            // const formulariodeDatos = new FormData();
            // this.archivos.forEach((archivo: any) => {
            //   formulariodeDatos.append('files', archivo)
            // })
          },
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

  // extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
  //   try {
  //     const unsafeImg = window.URL.createObjectURL($event);
  //     const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
  //     const reader = new FileReader();
  //     reader.readAsDataURL($event);
  //     reader.onload = () => {
  //       resolve({
  //         base: reader.result
  //       });
  //     };
  //     reader.onerror = error => {
  //       resolve({
  //         blob: $event,
  //         image,
  //         base: null
  //       });
  //     };
  //   } catch (e) {
  //     return null;
  //   }
  // })


  

}