import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authService: AuthService,
               private router: Router) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      console.log('Primero')
      if (this.authService.isAdmin()) {
        console.log('EXITO');
        return true;
      } else {
        console.log('USER')
        this.router.navigate(['vistaUsuario']);
        return false;
      }
    }

    this.router.navigate(['login']);
    return false;
  }

}
