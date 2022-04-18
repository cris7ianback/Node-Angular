import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  private URL = 'http://localhost:3000';
  currentIndex = -1;
  currentPersonal?: {};
  estado?: boolean;
  formAgUsuario !: FormGroup;
  usuarios: Users = { id_user: '', user: '', email: '', password: '', id_role: ''  };
  

  constructor(private router: Router,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private toast: NgToastService,
              private http: HttpClient,
              private usuarioService: UsuarioService,
              private dialogRef: MatDialogRef<RegistrarUsuarioComponent>) { }

  ngOnInit(): void {

    this.formAgUsuario = this.fb.group({
      user:     ['', [Validators.required, Validators.minLength(3)]],
      email:    ['', [Validators.required, Validators.minLength(3), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      id_role:  ['', [Validators.required, Validators.minLength(3)]]
    })



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


  registrarUsuario() {
    if (this.formAgUsuario.valid) {
      this.usuarioService.registrarUsuario(this.formAgUsuario.value)
        .subscribe({
          next: (res) => { },
          error: (err) => {
            if (err.status === 200) {
              this.toast.success({
                detail: "Usuario registrado",
                summary: "Usuario registrado con exito",
                duration: 3000,
                position: 'br'
              })

              this.formAgUsuario.reset();
              this.dialogRef.close('Registrar Usuario')


            } else {
              this.toast.error({
                detail: "Atención",
                summary: "Personal ya se encuentra Registrado",
                duration: 3000,
                position: 'br'
              })
            }

          }

        })
    }
  }

  campoEsValido(campo: string) {
    return this.formAgUsuario.controls[campo].errors
      && this.formAgUsuario.controls[campo].touched;
  }

  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['/listarUsuarios']);
  }
}
