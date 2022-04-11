import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';

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


  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService,
    private http: HttpClient) { }

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

  //Funcion que valida que los campos del Formulario no esten vacios.
  campoEsValido(campo: string) {
    return this.formAgPersonal.controls[campo].errors
      && this.formAgPersonal.controls[campo].touched;
  }

  registrarPersonal(): void {
    this.authService.registrarPersonal(this.personal)
      .subscribe(
        res => {
          this.toast.success({
            detail: "Personal Registrado",
            summary: "personal Registrado con Exito",
            duration: 3000,
            position: 'br'
          })
          console.log(res);

          localStorage.setItem('token', res.token);
          this.router.navigate(['/listarPersonal']);

        },
        err => {
          console.log(err)
          //console.log ("Usuario ya Existe")   
          this.toast.warning({
            detail: "Atención",
            summary: "Personal ya se encuentra  Registrado",
            duration: 3000,
            position: 'br'
          })
        }
      )
    if (this.formAgPersonal.invalid) {
      this.formAgPersonal.markAllAsTouched();
      return;
    }
  }


  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada",
      duration: 3000,
      position: 'br'})
        this.router.navigate(['/listarPersonal']);
      }
    

}




