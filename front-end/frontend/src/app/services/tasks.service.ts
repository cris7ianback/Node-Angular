import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  //personal
  listarPersonal() { return this.http.get<any>(this.URL + 'listarPersonal'); }
  eliminarPersonal(id_persona: any) { return this.http.get(`${this.URL}eliminarPersonal/${id_persona}`); }


  //Usuarios
  listarUsuarios() { return this.http.get<any>(this.URL + 'listarUsuarios'); }
  eliminarUsuario(id_user: string) { return this.http.get(`${this.URL}eliminarUsuario/${id_user}`); }

}

