import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

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
    nombre:   ['', [Validators.required, Validators.minLength(3),]],
    apellido: ['', [Validators.required, Validators.minLength(3),]],
    correo:   ['', [Validators.required, Validators.minLength(3), Validators.email]]
  })
  currentPersonal?: {};
  currentIndex?: number;


  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder, 
    private toast: NgToastService) { }

  ngOnInit(): void { }

  campoEsValido(campo: string) {
    return this.formAgPersonal.controls[campo].errors
      && this.formAgPersonal.controls[campo].touched;
  }

  registrarPersonal() {
    this.authService.registrarPersonal(this.personal)
      .subscribe(
        res => {
          this.toast.success({
            detail: "Personal registrado",
            summary: "Personal registrado",
            duration:3000,
            position: 'br'
          })
          localStorage.setItem('token', res.token);
          this.router.navigate(['/listarPersonal']);
         // console.log(res);
        },
        err => {
          this.toast.warning({
            detail: "Atención!",
            summary: "Personal ya Registrado.",
            duration: 3000,
            position: 'br'
          })
        } )
    if (this.formAgPersonal.invalid) {
      this.formAgPersonal.markAllAsTouched();
      return;
    }
  }



}




