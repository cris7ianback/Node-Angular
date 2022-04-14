import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PersonalService } from 'src/app/services/personal.service';
import { Personal } from 'src/app/models/personal';

@Component({
  selector: 'app-modificar-personal',
  templateUrl: './modificar-personal.component.html',
  styleUrls: ['./modificar-personal.component.css']
})
export class ModificarPersonalComponent implements OnInit {

  private URL = 'http://localhost:3000'
  estado?: boolean;


  personal: Personal = {
    id_persona: '',
    nombre: '', 
    apellido: '',
    correo: ''
  };

  nombreApellidoPattern: string = '([a-zA-Z]+)  ([a-zA-Z]+)';



  formModPersonal!: FormGroup;

  constructor(  private personalService: PersonalService,
                private router: Router,
                private fb: FormBuilder,
                @Inject(MAT_DIALOG_DATA) public editData: any,
                private toast: NgToastService,
                private http: HttpClient,
                private dialogRef: MatDialogRef<ModificarPersonalComponent>
                ) {

              
    this.formModPersonal = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3),]],
    apellido: ['', [Validators.required, Validators.minLength(3),]],
    correo: ['', [Validators.required, Validators.minLength(3), Validators.email]]
  });


  if (this.editData) {
    this.formModPersonal.controls['nombre'].setValue(this.editData.nombre);
    this.formModPersonal.controls['apellido'].setValue(this.editData.apellido);
    this.formModPersonal.controls['correo'].setValue(this.editData.correo);
  }

      
     }

     actualizarPersonal() {
      this.personalService.modificarPersonal(this.formModPersonal.value, this.editData.id_persona)
        .subscribe({
          next: (res) => {
  
            this.toast.success({
              detail: "Personal Modificado",
              summary: "Personal Modificado con Exito",
              duration: 3000,
              position: 'br'
            })
  
            this.formModPersonal.reset();
            this.dialogRef.close('Modificar Personal')
          },
          error: () => {
            this.toast.error({
              detail: "Error de Solicitud",
              summary: "Error al modificar Personal",
              duration: 3000,
              position: 'br'
            })
          }
        })
    }

  ngOnInit(): void {
    
    
    this.http.get<any>(this.URL + '/isAdmin')
    .subscribe(
      res => {
        console.log(res.status);
      },
      err => {
        if (err.status !== 200) {
          
          this.estado = false
          this.toast.error({
            detail: "Acceso Denegado",
            summary: "Solo personal Autorizado puede acceder",
            duration: 3000,
            position: 'br'
           })

          this.router.navigate(['/vistaUsuario'])
        }
        this.estado = true
      }
    );

   
  }

  campoEsValido(campo: string) {
    return this.formModPersonal.controls[campo].errors
      && this.formModPersonal.controls[campo].touched;
  }

  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Accion Cancelada Exitosa",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['listarPersonal']);
  } 
  }



