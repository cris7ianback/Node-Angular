import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  user = {
    user: '',
    email:'',
    password: '',
    id_role: ''
  }

  constructor( private authService: AuthService,
               private router: Router) { }

  ngOnInit(): void {
  }

  registrarUsuario(){
   this.authService.registrarUsuario(this.user)
   .subscribe(
     res => {
       console.log(res);
       localStorage.setItem('token', res.token);
       this.router.navigate(['private']);
     },
     err => console.log(err)
   )

 }

}
