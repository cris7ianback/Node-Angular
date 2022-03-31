import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/app/services/personal.service';
import { Personal } from 'src/app/models/personal';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-personal',
  templateUrl: './modificar-personal.component.html',
  styleUrls: ['./modificar-personal.component.css']
})
export class ModificarPersonalComponent implements OnInit {

  personalForm: FormGroup;
  currentPersonal: Personal = {};
  mensaje = '';
  personal: Personal = {
    id_persona: '',
    nombre: '',
    apellido: '',
    correo: ''
  };

  constructor(
    private personalService: PersonalService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {

    this.personalForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.email, Validators.required]]
    })
  }

  ngOnInit(): void {
    this.mensaje = '';

    const id_entrada = <string>this.activeRoute.snapshot.params['id_persona'];
    console.log('id de persona: ' + id_entrada);

    if (id_entrada) {
      console.log(id_entrada);
      this.personalService.listarPersonalId(id_entrada)
      .subscribe(
        res => {
          this.personal = res;
          console.log(res);
        },
        err => console.log(err)
      );
    }
  }

  listarPersonalId(id_entrada: any): void {
    this.personalService.listarPersonalId(id_entrada)
      .subscribe(
        data => {
          this.currentPersonal = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  modificarPersonal() {
    this.personalService.modificarPersonal(this.personal.id_persona, this.personal)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
          
        });
       Swal.fire ({
         title: 'Are you Sure?',
         text: ' bla bla bla',
         icon: 'error',
         showCancelButton: true,
         confirmButtonText: 'Go To Home',
         cancelButtonText: ' No, Keep it'}).then((result)=>{
           if (result.value){
             this.router.navigate(['/listarPersonal']);

           } else if (result.dismiss === Swal.DismissReason.cancel) {}
         })

    //this.router.navigate(['/listarPersonal']);
    // this.router.navigate(['modificarPersonal/'+this.personal.id_persona])
  }


}
