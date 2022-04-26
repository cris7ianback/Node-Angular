import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { environment } from 'src/environments/environment';

const URL = 'http://localhost:3000/'


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.URL;

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
  modificarUsuario(data: any, id: number) {
    return this.http.put<any>(URL + `modificarUsuario/${id}`, data)
  }
  //lista Usuarios por ID
  listarUsuariosId(id_user: string) {
    return this.http.get(URL + `listarUsuariosId/${id_user}`);
  }

  buscarPorNombre(id_user: any): Observable<any> {
    return this.http.get(URL + `modificarUsuario/${id_user}`);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {}
  }

  cambioPassword(data: any) {
    return this.http.post(URL + 'cambioPass', data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }


}



