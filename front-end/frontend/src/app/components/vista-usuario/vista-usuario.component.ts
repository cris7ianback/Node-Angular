import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/models/users';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.css']
})
export class VistaUsuarioComponent implements OnInit {

  listUsuarios!: Observable<Users[]> ;

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.listUsuarios = this._usuarioService.listarUsuarios();
   
  }

}
