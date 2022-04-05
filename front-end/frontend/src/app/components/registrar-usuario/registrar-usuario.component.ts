import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  user = {
    user: '',
    email: '',
    password: '',
    id_role: ''
  }

  formAgUsuario: FormGroup = this.fb.group({
    user: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    id_role: ['', [Validators.required, Validators.minLength(3)]]
  })

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private toast: NgToastService) { }

  ngOnInit(): void { }

  campoEsValido(campo: string) {
    return this.formAgUsuario.controls[campo].errors
      && this.formAgUsuario.controls[campo].touched;
  }

  registrarUsuario() {
    this.authService.registrarUsuario(this.user)
      .subscribe(
        res => {
          this.toast.success({
            detail: "Usuario Registrado",
            summary: " Usuario registrado",
            duration: 3000,
            position: 'br'
          })
          localStorage.setItem('token', res.token);
          this.router.navigate(['/listarUuario']);
        },
        err =>
          this.toast.success({
            detail: "Usuario Registrado",
            summary: " Usuario registrado",
            duration: 3000,
            position: 'br'
          })
      )
    if (this.formAgUsuario.invalid) {
      this.formAgUsuario.markAllAsTouched();
      return;
    }
    //this.router.navigate(['/listarUsuarios']);
    //window.location.href = "/listarUsuarios";
  }

  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada",
      duration: 3000,
      position: 'br'})
        this.router.navigate(['/listarUsuarios']);
      }
    
  

}
