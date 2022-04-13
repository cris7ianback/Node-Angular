import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';



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



  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private toast: NgToastService,
              private http: HttpClient) { }

  ngOnInit(): void {
    localStorage.removeItem('rid_ss0')

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
          //localStorage.setItem('role', res.roleHash);
          //localStorage.setItem('rid_ss0', res.rid_ss0);
          console.log(res.token)

          this.http.get<any>(this.URL + 'isEditOrAdmin')
            .subscribe(
              res => {
                console.log('El resultado es:' + res.status);
              },
              err => {
                if (err.status == 200) {
                  console.log('aqui entro a listar Personal')
                  this.router.navigate(['listarPersonal']);
                } else {
                  console.log('aqui entro a vista de usuario')
                  this.router.navigate(['vistaUsuario']);
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