import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Personal } from '../models/personal';

const URL = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private http: HttpClient,
              private https: HttpClientModule) { }

  listarPersonal(): Observable<any> {
    return this.http.get<Personal[]>(URL + 'listarPersonal');
  }
  //elimina Personal
  eliminarPersonal(id_persona: any) {
    return this.http.get(`${URL}eliminarPersonal/${id_persona}`);
  }
  //Modifica Personal por ID
  modificarPersonal(id_persona: any, data: any): Observable<any> {
    return this.http.put<any>(URL + 'modificarPersonal/'+ id_persona, data);
  }
  //trae un Personal por ID
  listarPersonalId(id_persona: string) {
    return this.http.get(URL + `listarPersonalId/${id_persona}`);
  }
  //Función Buscar Personal
  buscarPorNombre(nombre: any): Observable<any> {
    return this.http.get(URL + `modificarPersonal/${nombre}`);
  }

  updateEmployee(data: any, id_persona: any) {
    return this.http.put<any>(URL + `modificarPersonal/${id_persona}`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
