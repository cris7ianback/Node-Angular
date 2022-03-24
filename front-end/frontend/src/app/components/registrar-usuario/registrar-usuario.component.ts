import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  user = {
    user: '',
    email: '',
    password: '',
    id_role: ''
  
  }

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  registrarUsuario() {
    this.authService.registrarUsuario(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
        
        },
        err => console.log(err)
      )
      window.location.href = "/listarUsuarios";
  }

}
