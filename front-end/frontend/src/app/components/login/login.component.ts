import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;


  miFormulario: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.minLength(3), Validators.email]],
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
              private fb:     FormBuilder,
              private toast:  NgToastService) { }

  ngOnInit(): void {
  }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }

  login() {
    this.authService.login(this.user)
      .subscribe(
        res => {
          console.log(res);
          this.toast.success({
            detail: "Inicio de Sesión",
            summary: "Usuario Verificado!",
            duration: 2000,
            position: 'br'
          })
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.roleHash);
          this.router.navigate(['/listarPersonal']);
        }, err => {
          this.toast.error({
            detail: "Error al iniciar sesión ",
            summary: "Login Fallido, verificar Credenciales.",
            duration: 3000,
            position: 'br'
          })

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