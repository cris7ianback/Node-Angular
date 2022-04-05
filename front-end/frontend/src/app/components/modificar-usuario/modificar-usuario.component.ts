import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  currentUsuario: Users = {};
  
  usuarios: Users = {
    id_user: '',
    user: '',
    email: '',
    password: '',
    id_role: ''
  };

  formModUsuario: FormGroup = this.fb.group({
    user:     ['', [Validators.required, Validators.minLength(3)]],
    email:    ['', [Validators.required, Validators.minLength(3), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    id_role:  ['', [Validators.required, Validators.minLength(3)]]
  })

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toast: NgToastService
  ) {

    this.usuarioForm = this.fb.group({
      user: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      id_role: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    

    const id_entrada = <string>this.activeRoute.snapshot.params['id_user'];
    console.log('id de usuario:' + id_entrada)

    if (id_entrada) {
      console.log(id_entrada);
      this.usuarioService.listarUsuariosId(id_entrada)
        .subscribe(
          res => {
            this.usuarios = res;
            console.log(res)
          },
          err => console.log(err)
        );
    }
  }

  campoEsValido(campo: string) {
    return this.formModUsuario.controls[campo].errors
      &&   this.formModUsuario.controls[campo].touched;
  }

  listarUsuariosId(id_entrada: any): void {
    this.usuarioService.listarUsuariosId(id_entrada)
      .subscribe(
        data => {
          this.currentUsuario = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  modificarUsuario() {
    this.usuarioService.modificarUsuario(this.usuarios.id_user, this.usuarios)
      .subscribe(
        res => {
          console.log(res);
          this.toast.success({
            detail: "Usuario Modificado",
            summary: "Usuario Modificado con Exito",
            duration: 3000,
            position: 'br'
          })
            this.router.navigate(['/listarUsuarios']);
        },
        err => {
          console.log(err);
          this.toast.error({
            detail: "Error",
            summary: " Usuario No modificado registrado",
            duration: 3000,
            position: 'br'
          })
        })
  
  
  }

  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['/listarUsuarios']);
  }

}
