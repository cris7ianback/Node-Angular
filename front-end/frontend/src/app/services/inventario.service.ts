import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario } from '../models/inventario';

const URL = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class InventarioServices {

  constructor(private http: HttpClient) { }

  eliminarInventario(id_inventario: any) {
    return this.http.get(`${URL}eliminarInventario/${id_inventario}`);
  }

  listarInventario(): Observable<any> {
    return this.http.get<Inventario[]>(URL + 'listarInventario');
  }

  registrarInventario(inventario: any) {
    return this.http.post<any>(URL + 'registrarInventario', inventario);
  }

  modificarInventario(data: any, id: number) {
    return this.http.put<any>(URL + `modificarInventario/${id}`, data)
  }



}
