import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;


  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3),Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })
  incorrecta!: boolean;
  mensaje?: any;

  user = {
    email: '',
    password: ''
  }
  formBuilder: any;


  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }

  login() {

    //    console.log('prueba')
    this.authService.login(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.roleHash);
          this.router.navigate(['/listarPersonal']);
        },
        (serverLoginError: any) => {
          console.log('error in subscriber err');
          console.log(serverLoginError.statusText, serverLoginError.status);
          if (serverLoginError.status != 200) {
            console.log(' password o contraseña erronea')
            console.log(this.mensaje);
            this.incorrecta = true;
          }
          //err => console.log(err)
        }
      )

    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
  }

  OnResetForm(): void {
    this.loginForm.reset();
  }
}