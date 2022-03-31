import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-personal',
  templateUrl: './registrar-personal.component.html',
  styleUrls: ['./registrar-personal.component.css']
})
export class RegistrarPersonalComponent implements OnInit {

  personal = {
    nombre: '',
    apellido: '',
    correo: '',
  }
  nombreApellidoPattern: string = '([a-zA-Z]+)  ([a-zA-Z]+)';

  formAgPersonal: FormGroup = this.fb.group({
    nombre:   ['', [Validators.required, Validators.minLength(3), ]],
    apellido: ['', [Validators.required, Validators.minLength(3), ]],
    correo:   ['', [Validators.required, Validators.minLength(3), Validators.email]]
  })


  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void { }

  campoEsValido(campo: string) {
    return this.formAgPersonal.controls[campo].errors
      && this.formAgPersonal.controls[campo].touched;
  }

  registrarPersonal() {
    this.authService.registrarPersonal(this.personal)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
        },
        err => console.log(err)
      )
    if (this.formAgPersonal.invalid) {
      this.formAgPersonal.markAllAsTouched();
      return;
    }
    alert("Personal Ingresado" )
    this.router.navigate(['/listarPersonal']);
  }



}
