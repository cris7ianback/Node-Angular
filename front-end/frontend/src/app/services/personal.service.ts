import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  modificarPersonal(id_persona: any, data: any): Observable<any> { return this.http.put(URL + `modificarPersonal/${id_persona}`, data); }
  //trae un Personal por ID
  listarPersonalId(id_persona: string) { return this.http.get(URL + `listarPersonalId/${id_persona}`);  }

}
