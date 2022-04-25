import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Users } from 'src/app/models/users';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  formModUsuario!: FormGroup;
  hide = true;
  post: any = '';
  currentUser: any;

  usuarios: Users = {
    id_user: '',
    user: '',
    email: '',
    password: '',
    id_role: ''
  };

  constructor(private router: Router,
              private toast: NgToastService,
              private usuarioService: UsuarioService,
              private fb: FormBuilder,
              private customValidator :CustomValidationService) { 

    this.formModUsuario = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      newPassword: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
      id_role: ['', [Validators.required, Validators.minLength(3)]],
      
    },
    {
     validators : [ this.customValidator.camposIguales('newPassword', 'confirmPassword')]

    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formModUsuario.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
  }

  
  campoEsValido(campo: string) {
    return this.formModUsuario.controls[campo].errors
      && this.formModUsuario.controls[campo].touched;
  }
 

  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada Exitosa",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['/listarUsuarios']);
  }
  

  

 


}
