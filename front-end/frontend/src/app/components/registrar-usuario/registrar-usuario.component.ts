import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
    id_role: ''  }

    formAgUsuario: FormGroup = this.fb.group ({
      user: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]], 
      id_role: ['', [Validators.required, Validators.minLength(3)]] 
    })

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {  }

  campoEsValido (campo:string){
    return this.formAgUsuario.controls[campo].errors
      &&   this.formAgUsuario.controls[campo].touched;
  }

  registrarUsuario() {
    this.authService.registrarUsuario(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
        },
        err => console.log(err)
      )
      if (this.formAgUsuario.invalid) {
        this.formAgUsuario.markAllAsTouched();
        return;
      }

      Swal.fire ({
        title: 'Usuario Ingresado Correctamente',
        //text: ' Su Usuario ha sido Modificado Exitosamente',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Aceptar'
        }).then((result)=>{
          if (result.value){
           
            this.router.navigate(['/listarUsuarios']);

          }
        })
      //this.router.navigate(['/listarUsuarios']);
      //window.location.href = "/listarUsuarios";
  }

  cancelar(){
    Swal.fire({
      title: 'Acción Cancelada',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/listarUsuarios']); }
    })
  }

}
