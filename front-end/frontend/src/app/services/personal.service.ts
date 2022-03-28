import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personal } from '../models/personal';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  public URL = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  listarPersonal() { return this.http.get<any>(this.URL + 'listarPersonal'); }
  //elimina Personal
  eliminarPersonal(id_persona: any) { return this.http.get(`${this.URL}eliminarPersonal/${id_persona}`); }
  //Modifica Personal por ID
  modificarPersonal(id_persona: any, data: any): Observable<any> { return this.http.get(URL + `modificarPersonal/${id_persona}`, data); }
  //trae un Personal por ID
  listarPersonalId(id_persona: string) { return this.http.get(URL + `listarPersonalId/${id_persona}`);  }
  //Función Buscar Personal
  buscarPorNombre (nombre: any): Observable <any>{ return this.http.get (URL + `modificarPersonal/${nombre}`)}

 //modificar equipo
 modificarPersona2(id_persona:string, persona:Personal){
  return this.http.put(this.URL+'/'+id_persona, persona); }

  update(id_persona: any, data: any): Observable<any> { return this.http.put(`${URL}/${id_persona}`, data);
}
}

