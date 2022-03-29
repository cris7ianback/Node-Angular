import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  currentUsuario: Users = {};
  mensaje = '';
  usuarios: Users = {
    id_user: '',
    user: '',
    email: '',
    password: '',
    id_role: ''
  };

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {

    this.usuarioForm = this.fb.group({
      user: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      id_role: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.mensaje = '';

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
        },
        err => {
          console.log(err);
        })
      window.location.href = "/listarUsuarios";
    //this.router.navigate(['/listarUsuarios']);
  }

}
