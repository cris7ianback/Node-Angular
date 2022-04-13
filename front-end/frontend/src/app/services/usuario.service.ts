import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

const URL = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  

  constructor(private http: HttpClient) { }
  //Conecta con lista Usuarios back-end y front-end
  listarUsuarios() {
    return this.http.get<Users[]>(URL + 'listarUsuarios');
  }

  registrarUsuario(user: any) {
    return this.http.post<any>(URL + 'registrarUsuario', user)
  }

  //eliminar usuario
  eliminarUsuario(id_user: any) {
    return this.http.get(`${URL}eliminarUsuario/${id_user}`);
  }
  //modifica Usuario
  modificarUsuario ( data: any, id : number){
    return this.http.put <any>(URL + `modificarUsuario/${id}`, data)
  }
  //lista Usuarios por ID
  listarUsuariosId(id_user: string) {
    return this.http.get(URL + `listarUsuariosId/${id_user}`);
  }

  buscarPorNombre(id_user: any): Observable<any> {
    return this.http.get(URL + `modificarUsuario/${id_user}`);
  }

  
  
}



