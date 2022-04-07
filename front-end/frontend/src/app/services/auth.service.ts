import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


const URL = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/'

  constructor( private http  : HttpClient,
               private router: Router,
               private toast : NgToastService) { }

  login(user: any) {
    return this.http.post<any>(this.URL + 'login', user)  }

  registrarUsuario(user: any) {
    return this.http.post<any>(this.URL + 'registrarUsuario', user)   }

  registrarPersonal(personal: any) {
    return this.http.post<any>(this.URL + 'registrarPersonal', personal)  }

  loggedIn() { return !!localStorage.getItem('token');  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.toast.success({
      detail: "Sesión Finalizada",
      summary: "Usuario deslogueado.",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['/login']);

  }

  getToken() { return localStorage.getItem('token');   }
}