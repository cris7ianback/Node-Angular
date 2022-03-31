import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validator, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  // miFormulario: FormGroup = new FormGroup ({
  //   email: new FormControl (''),
  //   password: new FormControl ('')
  // })

  miFormulario : FormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
  })

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5)]),
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
              private router: Router,
              private fb: FormBuilder
  ) {
    this.loginForm = this.createFormGroup();
   }

   campoEsValido (campo: string){
    return this.miFormulario.controls[campo].errors 
    &&     this.miFormulario.controls[campo].touched;

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

      if(this.miFormulario.invalid){
        this.miFormulario.markAllAsTouched();
        
        return;
      }

  }

  OnResetForm(): void{
    this.loginForm.reset();
  }


}
