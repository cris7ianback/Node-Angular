import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/'

  constructor(private http: HttpClient,
              private router: Router) { }

  login( user: any ) { return this.http.post<any>(this.URL + 'login', user); }
  registrarUsuario(user: any) { return this.http.post<any>(this.URL + 'registrarUsuario', user) }
  loggedIn() { return !!localStorage.getItem('token'); }
  getToken() { return localStorage.getItem('token'); }
  logout() { localStorage.removeItem('token'); this.router.navigate(['login']);
  }

}
