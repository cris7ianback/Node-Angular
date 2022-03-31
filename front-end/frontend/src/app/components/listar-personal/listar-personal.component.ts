import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/app/services/personal.service';

import { Personal } from 'src/app/models/personal';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-listar-personal',
  templateUrl: './listar-personal.component.html',
  styleUrls: ['./listar-personal.component.css']
})
export class ListarPersonalComponent implements OnInit {

  currentPersonal: Personal = {}
  currentIndex = -1;
  listarPersonal?: any;
  id_persona?: any;
  personal: any = [];
  personalForm?: FormGroup;
  mensaje = '';
  formValue!: FormGroup;

  personalObj: Personal = new Personal();

  formBuilder: any;



  constructor(private personalService: PersonalService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formbuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formValue = this.formbuilder.group({
      id_persona: [''],
      nombre: [''],
      apellido: [''],
      correo: [''],
    })

    this.personalService.listarPersonal()
      .subscribe(
        res => this.personal = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
        })
  }

  setActivePersonal(personal: Personal, index: number): void {
    this.currentPersonal = personal;
    this.currentIndex = index;
  }

  refreshList(): void {
    window.location.reload();
    this.currentPersonal = {};
    this.currentIndex = -1;
  }

  eliminarPersonal(id_persona: any): void {
    console.log('Persona eliminada:', id_persona)
    this.personalService.eliminarPersonal(id_persona)
      .subscribe(
        response => {
          // this.refreshList();
          console.log(response)
        },
        err => {
          console.log(err)
        });
    alert("Usuario Eliminado")
    window.location.reload();
  }

  buscarPorNombre(): void {
    this.personalService.buscarPorNombre(this.listarPersonal)
      .subscribe(
        data => {
          this.listarPersonal = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  // modificarPersonal(id_persona: any) {
  //   this.router.navigate(['edit/:id_persona']);

  // }

  editarPersonal(personal: any) {
    this.personalObj.id_persona = personal.id_persona;
    this.formValue.controls['id_persona'].setValue(personal.id_persona);
    this.formValue.controls['nombre'].setValue(personal.nombre);
    this.formValue.controls['apellido'].setValue(personal.apellido);
    this.formValue.controls['correo'].setValue(personal.correo);
  }

  modificarPersonal(personalObj:Personal){
    this.personalObj.nombre = this.formValue.value.nombre;
    this.personalObj.apellido = this.formValue.value.apellido;
    this.personalObj.correo= this.formValue.value.correo;
   
   this.personalService.modificarPersonal(this.personalObj, this.personalObj.id_persona)
   .subscribe(res =>{
     alert("Actualización Exitosa");
     let ref = document.getElementById('cancel')
     ref?.click();
     this.formValue.reset();
     this.listarPersonal();
     
   } )
  }

}

