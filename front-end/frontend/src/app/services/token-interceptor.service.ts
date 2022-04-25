import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';



const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(   ) { }

  intercept(req:any, next:any) {

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const rid_ss0 = localStorage.getItem('rid_ss0');

    const tokenHeader = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        RoleKey: `Bearer ${role}`,
        Rid_ss0:`Bearer ${rid_ss0}`

      }
    });
    return next.handle(tokenHeader);
  }
   signOut(): void {
     window.sessionStorage.clear();
   }

   public saveToken(token: string): void {
     window.sessionStorage.removeItem(TOKEN_KEY);
     window.sessionStorage.setItem(TOKEN_KEY, token);
   }

   public getToken(): string | null {
     return sessionStorage.getItem(TOKEN_KEY);
   }

   public saveUser(user: any): void {
     window.sessionStorage.removeItem(USER_KEY);
     window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
   }

   public getUser(): any {
     const user = window.sessionStorage.getItem(USER_KEY);
     if (user) {
       return JSON.parse(user);
     }
     return {};
   }

}
