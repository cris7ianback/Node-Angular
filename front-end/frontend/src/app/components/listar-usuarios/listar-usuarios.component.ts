import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';




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
  currentPersonal?: {};
 
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

  refreshList(): void {
    window.location.reload();
    this.currentPersonal = {};
    this.currentIndex = -1;
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
   
        Swal.fire({
          title: 'Personal Eliminado',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.value) {
    
            this.refreshList();
    
          }
        })

  }

  setActiveUsuario(users: Users, index: number): void {
    this.currentUsuario = users;
    this.currentIndex = index;
  }

  modificarUsuario(id_user: any){
    this.router.navigate(['modificarPersonal/:id_user']);
  }
  cancelar(){
    Swal.fire({
      title: 'Acción Cancelada',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['listarPersonal']); }
    })
  }
}



