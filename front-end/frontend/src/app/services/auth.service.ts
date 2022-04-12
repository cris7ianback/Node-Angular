import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  estado?: boolean;

  private URL = 'http://localhost:3000/'

  constructor(private http: HttpClient,
    private router: Router,
    private toast: NgToastService) { }

  login(usuario: any) {
    return this.http.post<any>('http://localhost:3000/'+ 'login', usuario)
  }
  loggedIn() { return !!localStorage.getItem('token'); }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('rid_ss0')
    this.toast.success({
      detail: "Sesión Finalizada",
      summary: "Usuario deslogueado.",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['login']);

  }
  registrarUsuario(user: any) {
    return this.http.post<any>('http://localhost:3000/' + 'registrarUsuario', user)
  }

  registrarPersonal(personal: any) {
    return this.http.post<any>('http://localhost:3000/' + 'registrarPersonal', personal)
  }



  isAdmin() {
    return this.http.get<any>('http://localhost:3000/' + 'isAdmin')
      .subscribe(
        res => {
          console.log(res.status);
        },
        err => {
          if (err.status == 200) {
            this.estado = true
            console.log('El estado es :' + this.estado)
          } else {
            this.estado = false
            console.log('el estado es :' + this.estado + '!!!')
          }
        }
      );


  }

  getToken() { return localStorage.getItem('token'); }
}