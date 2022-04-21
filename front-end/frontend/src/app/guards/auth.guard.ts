import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authServices: AuthService,
              private router: Router) { }


  canActivate(): boolean {
    if (!this.authServices.isAuth()) {
      console.log('Token no es valido o ya expiró');
      this.router.navigate(['login'])
      return false;
    }
    return true;
  }

}
