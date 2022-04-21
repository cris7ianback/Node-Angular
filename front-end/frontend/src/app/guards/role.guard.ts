import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Users } from '../models/users'

import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
 
  

 constructor( private authService : AuthService,
              public router: Router ){}
 
  canActivate( route: ActivatedRouteSnapshot): boolean{
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');

    const {  id_role } = decode(token);
    console.log(id_role);

    if( !this.authService.isAuth() || id_role !== expectedRole){
      console.log('Usuario no autorizado para la vista');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
