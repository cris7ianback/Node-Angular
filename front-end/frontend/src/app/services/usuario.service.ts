import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL =' http://localhost:3000/'

  constructor( private http: HttpClient) { }

  listarUsuarios() { return this.http.get<any>(this.URL + 'listarUsuarios'); }
  eliminarUsuario(id_user: string) { return this.http.get(`${this.URL}eliminarUsuario/${id_user}`); }
}
