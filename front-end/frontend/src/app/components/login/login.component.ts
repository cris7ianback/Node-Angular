import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private URL = 'http://localhost:3000'
  public loginForm!: FormGroup;


  miFormulario: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.minLength(3), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })
  incorrecta!: boolean;
  mensaje?: any;
  formBuilder: any;

  user = {
    email: '',
    password: ''
  }



  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors
      &&   this.miFormulario.controls[campo].touched;
  }

  login(): void {
    this.authService.login(this.user)
      .subscribe(
        res => {

          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.roleHash);

          this.http.get<any>(this.URL + '/isAdmin')
            .subscribe(
              res => {
                console.log(res.status);
              },
              err => {
                if (err.status == 200) {
                  this.router.navigate(['/listarPersonal']);
                  this.toast.success({
                    detail: "Acceso Correcto",
                    summary: "Bienvenido Administrador",
                    duration: 4000,
                    position: 'br'
                  })

                } else {
                  this.toast.success({
                    detail: "Acceso Correcto",
                    summary: "Bienvenido Usuario",
                    duration: 4000,
                    position: 'br'
                  })

                  this.router.navigate(['/vistaUsuario']);
                }
              }
            );
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