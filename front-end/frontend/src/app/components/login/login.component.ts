import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required,Validators.minLength(5)])
      //mensaje: new FormControl('', [Validators.required])
    })
  }

  user = {
    email: '',
    password: ''
  }
  formBuilder: any;
  

  constructor(private authService: AuthService,
              private router: Router
  ) {
    this.loginForm = this.createFormGroup();
   }

  ngOnInit(): void {
  }

  login() {

    //    console.log('prueba')
    this.authService.login(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          this.router.navigate(['/listarPersonal']);
        },
        err => console.log(err)
      )

  }

  OnResetForm(): void{
    this.loginForm.reset();
  }


}
