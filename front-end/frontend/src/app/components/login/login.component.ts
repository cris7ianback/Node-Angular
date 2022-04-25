import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from 'src/app/services/usuario.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private URL = 'http://localhost:3000/'
  public loginForm!: FormGroup;

  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })
  incorrecta!: boolean;

  user = {
    email: '',
    password: ''
  }
  formBuilder: any;
  isLoggedIn = false;
  roles: string[] = [];



  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService,
    private http: HttpClient,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    localStorage.removeItem('rid_ss0')

    if (this.authService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.usuarioService.getUser().roles;

    }


  }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }

  login(): void {

    this.incorrecta = false;

    this.authService.login(this.user)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          console.log(res.token)

          this.http.get<any>(this.URL + 'isEditOrAdmin')
            .subscribe(
              res => {
                console.log('El resultado es:' + res.status);
              },
              err => {
                if (err.status == 200) {
                  this.router.navigate(['listarPersonal']);
                  this.toast.success({
                    detail: "Acceso Administrador",
                    summary: "Bienvenido Administrador",
                    duration: 3000,
                    position: 'br'
                  })
                } else {

                  this.toast.success({
                    detail: "Acceso Personal",
                    summary: "Bienvenido Personal",
                    duration: 3000,
                    position: 'br'
                  })
                  this.router.navigate(['vistaUsuario']);
                }
              }
            );
        },

        // En caso de escribir mal o usuario levanta Error en ventana Principal.
        (serverLoginError: any) => {
          if (serverLoginError.status != 200) {
            this.toast.error({
              summary: "Error de Contraseña o Email",
              detail: "Acceso Denegado",
              duration: 3000,
              position: 'br'
            })
            this.incorrecta = true;
          }
        })

    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }


  }

  OnResetForm(): void {
    this.loginForm.reset();
  }
}