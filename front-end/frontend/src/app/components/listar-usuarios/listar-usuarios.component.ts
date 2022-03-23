import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  usuario: any =[];

  constructor( private taskServices: TasksService,
    private router: Router) { }

  ngOnInit(): void {

    this.taskServices.listarUsuarios()
    .subscribe(
      res => {
        console.log(res)
        this.usuario = <any>res;
      },
      err =>console.log(err)
    );
  }

  eliminarUsuario( id_user:string){
    this.taskServices.eliminarUsuario(id_user).subscribe(
      res => {
        console.log('Usuario Eliminado');
        this.usuario();
      },
      err => console.log(err)
    );
  }

}
