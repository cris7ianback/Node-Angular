import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }


  listarPersonal() { return this.http.get<any>(this.URL + 'listarPersonal'); }
  listarUsuarios() { return this.http.get<any>(this.URL + 'listarUsuarios'); }
  //eliminarUsuario(id_user: string) { return this.http.post<any>(this.URL + 'eliminarUsuario/' + id_user) }
  eliminarUsuario(id: string) {return this.http.delete(`${this.URL}eliminarUsuario/${id}`);}
  eliminarPersonal(id: string) {return this.http.delete(`${this.URL}eliminarUsuario/${id}`);}
  
 }

