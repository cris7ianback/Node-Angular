import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  currentUsuario: Users = {};
  currentIndex = -1;
  id_user?: string;
  listarUsuarios?: any;
  //usuarios: any = [];
  usuario?:any;
 
  constructor(
    private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {

    this.usuarioService.listarUsuarios()
      .subscribe(
        res => {
          console.log(res)
          this.usuario = <any>res;
        },
        err => console.log(err)
      );
  }

  eliminarUsuario(id_user: any): void {
    this.usuarioService.eliminarUsuario(id_user)
      .subscribe(
        res => {
          console.log(res)
        },
        error => {
          console.log(error);
        });
        alert("Usuario Eliminado")
        
    window.location.reload();
  }

  setActiveUsuario(users: Users, index: number): void {
    this.currentUsuario = users;
    this.currentIndex = index;
  }

  modificarUsuario(id_user: any){
    this.router.navigate(['modificarPersonal/:id_user']);
  }

}


