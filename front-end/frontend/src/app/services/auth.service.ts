import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgToastService } from 'ng-angular-popup';
import { Usuario } from '../models/users';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  estado?: boolean;

  private URL = 'http://localhost:3000/'

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService,
              private toast: NgToastService,
              private router: Router,
  ) { }

  login(usuario: any) { return this.http.post<any>(this.URL + 'login', usuario) }

  isAuth(): boolean {
    const token = localStorage.getItem('token');
    if ( !localStorage.getItem('token')) {
      return false;
    }
    return true;

  }




  loggedIn() { return !!localStorage.getItem('token'); }

  logout() {
    this.http.get<any>(this.URL + 'logout')
      .subscribe(
        res => {
          this.toast.success({
            detail: "Sesión Finalizada",
            summary: "Usuario deslogueado.",
            duration: 3000,
            position: 'br'
          })
          console.log(res.status);
        },
        err => { }
      )
    localStorage.removeItem('token');
    return this.router.navigate(['login']);

  }

  isAdmin() {
    return this.http.get<any>(this.URL + 'isAdmin')
      .subscribe(
        res => {
          console.log(res.status);
        },
        err => {
          if (err.status == 200) {
            this.estado = true

          } else {
            this.estado = false
            console.log('el estado es :' + this.estado + '!!!')
          }
        }
      );
  }

 

  getToken() { return localStorage.getItem('token');
 }
}

