import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      email: ['', [Validators.required, Validators.minLength(3)]],
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
      this.router.navigate(['/listarUsuarios']);
      //window.location.href = "/listarUsuarios";
  }

}
