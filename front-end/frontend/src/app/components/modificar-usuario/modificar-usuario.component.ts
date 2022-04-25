import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidationService } from 'src/app/services/custom-validation.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {
  
  private URL = 'http://localhost:3000'
  estado?: boolean;
  hide = true;



  usuarios: Users = {
    id_user: '',
    user: '',
    email: '',
    password: '',
    id_role: ''
  };

  formModUsuario!: FormGroup;

  constructor(  private usuarioService: UsuarioService,
                private router: Router,
                private fb: FormBuilder,
                @Inject(MAT_DIALOG_DATA) public editData: any,
                private toast: NgToastService,
                private http: HttpClient,
                private dialogRef: MatDialogRef<ModificarUsuarioComponent>,
                private customValidator :CustomValidationService
  ) {

    this.formModUsuario = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      newPassword: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
      id_role: ['', [Validators.required, Validators.minLength(3)]]
    },{
       validators : [ this.customValidator.camposIguales('newPassword', 'confirmPassword')]

  });

    


    if (this.editData) {
      this.formModUsuario.controls['user'].setValue(this.editData.user);
      this.formModUsuario.controls['email'].setValue(this.editData.email);
      this.formModUsuario.controls['password'].setValue(this.editData.password);
      this.formModUsuario.controls['id_role'].setValue(this.editData.id_role);
    }

  }

  actualizarUsuario() {
    this.usuarioService.modificarUsuario(this.formModUsuario.value, this.editData.id_user)
      .subscribe({
        next: (res) => {

          this.toast.success({
            detail: "Usuario Modificado",
            summary: "Usuario Modificado con Exito",
            duration: 3000,
            position: 'br'
          })

          this.formModUsuario.reset();
          this.dialogRef.close('Modificar Usuario')
        },
        error: () => {
          this.toast.error({
            detail: "Error de Solicitud",
            summary: "Error Al modificar Usuario",
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
    return this.formModUsuario.controls[campo].errors
      && this.formModUsuario.controls[campo].touched;
  }

  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada Exitosa",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['/listarUsuarios']);
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.formModUsuario.controls[controlName].hasError(errorName);
  }

}
