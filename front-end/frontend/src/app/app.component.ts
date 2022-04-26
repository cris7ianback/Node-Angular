import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Users } from 'src/app/models/users';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private URL = 'http://localhost:3000/'
  estado?: boolean;

  user? :string;

  constructor(public authService: AuthService,
    private http: HttpClient) { }
  title = 'frontend';

  ngOnInit() {
    

    this.estado = false
    return this.http.get<any>(this.URL + 'isAdmin')
      .subscribe(
        res => {
          console.log(res.status);
        },
        err => {
          if (err.status == 200) {
            this.estado = true
           
          } else {
            this.estado = false;
            console.log(this.estado)
          }
        }
      )
  }


  cambioPass(){
    

  }

  
}
