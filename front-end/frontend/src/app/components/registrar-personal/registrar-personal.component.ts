import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-personal',
  templateUrl: './registrar-personal.component.html',
  styleUrls: ['./registrar-personal.component.css']
})
export class RegistrarPersonalComponent implements OnInit {

  personal = {
    nombre: '',
    apellido: '',
    correo: '',

  }

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  registrarPersonal() {
    this.authService.registrarPersonal(this.personal)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);

        },
        err => console.log(err)
      )
    window.location.href = "/listarPersonal";
  }

}
