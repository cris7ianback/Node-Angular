import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';
import { PersonalService } from 'src/app/services/personal.service'

@Component({
  selector: 'app-registrar-personal',
  templateUrl: './registrar-personal.component.html',
  styleUrls: ['./registrar-personal.component.css']
})
export class RegistrarPersonalComponent implements OnInit {

  private URL = 'http://localhost:3000'
  estado?: boolean;

  personal = {
    nombre: '',
    apellido: '',
    correo: '',
  }
  nombreApellidoPattern: string = '([a-zA-Z]+)  ([a-zA-Z]+)';

  formAgPersonal: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3),]],
    apellido: ['', [Validators.required, Validators.minLength(3),]],
    correo: ['', [Validators.required, Validators.minLength(3), Validators.email]]
  })
  currentPersonal?: {};
  currentIndex?: number;
  dialogRef: any;


  constructor(private personalService: PersonalService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.formAgPersonal = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.minLength(3), Validators.email]]
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

  //Funcion que valida que los campos del Formulario no esten vacios.
  campoEsValido(campo: string) {
    return this.formAgPersonal.controls[campo].errors
      && this.formAgPersonal.controls[campo].touched;
  }

  registrarPersonal(): void {
    if (this.formAgPersonal.valid) {
      this.personalService.registrarPersonal(this.formAgPersonal.value)
        .subscribe({
          next: (res) => { },
          error: (err) => {
            if (err.status === 200) {
              this.toast.success({
                detail: "Usuario Registrado",
                summary: "Usuario Registrado con Exito",
                duration: 3000,
                position: 'br'
              })
            } else {
              this.toast.error({
                detail: "Atención",
                summary: "Usuario ya se encuentra  Registrado",
                duration: 3000,
                position: 'br'
              })
            }
          }
        }
        )
      if (this.formAgPersonal.invalid) {
        this.formAgPersonal.markAllAsTouched();
        return;
      }
    }
  }


    cancelar() {
      this.toast.warning({
        detail: "Atención",
        summary: "Acción Cancelada",
        duration: 3000,
        position: 'br'
      })
      this.router.navigate(['/listarPersonal']);
    }


  }




