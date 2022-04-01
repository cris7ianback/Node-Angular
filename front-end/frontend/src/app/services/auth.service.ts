import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

const URL = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/'

  constructor(private http: HttpClient,
    private router: Router) { }

  login(user: any) {
    return this.http.post<any>(this.URL + 'login', user)
    
  }

  registrarUsuario(user: any) {
    return this.http.post<any>(this.URL + 'registrarUsuario', user)
  }

  registrarPersonal(user: any) {
    return this.http.post<any>(this.URL + 'registrarPersonal', user)
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    Swal.fire({
      title: 'Usuario Deslogueado Correctamente',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['login']); }
    })
  }

  getToken() {
    return localStorage.getItem('token');
  }
}