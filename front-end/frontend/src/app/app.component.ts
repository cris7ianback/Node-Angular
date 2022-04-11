import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private URL = 'http://localhost:3000/'
  estado?: boolean;

  constructor(public authService: AuthService,
    private http: HttpClient) { }
  title = 'frontend';

  ngOnInit() {
    console.log('Estado:' + this.estado)

    this.estado = false
    return this.http.get<any>(this.URL + 'isAdmin')
      .subscribe(
        res => {
          console.log(res.status);
        },
        err => {
          if (err.status == 200) {
            this.estado = true
            console.log(this.estado)
          } else {
            this.estado = false;
            console.log(this.estado)
          }
        }
      )
  }

}
