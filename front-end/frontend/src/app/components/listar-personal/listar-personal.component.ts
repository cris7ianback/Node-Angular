import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Subject } from 'rxjs';

import { Personal } from 'src/app/models/personal';
import { PersonalService } from 'src/app/services/personal.service';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-personal',
  templateUrl: './listar-personal.component.html',
  styleUrls: ['./listar-personal.component.css']
})
export class ListarPersonalComponent implements OnDestroy, OnInit {

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

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();



  constructor(private personalService: PersonalService,
    private router: Router,
    private formbuilder: FormBuilder) { }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      language: {
        url:'//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
      }
    };

    this.formValue = this.formbuilder.group({
      id_persona: [''],
      nombre: [''],
      apellido: [''],
      correo: [''],
    })

    // this.personalService.listarPersonal()
    //   .subscribe(
    //     res => this.personal = res,
        //     err => {
    //       if (err instanceof HttpErrorResponse) {
    //         if (err.status === 401) {
    //           this.router.navigate(['/signin']);
    //         }
    //       }
    //     })

    this.personalService.listarPersonal()
    .subscribe((res:any) =>{
      this.personal = res.personal;
      this.dtTrigger.next(res);
    });

        this.personalService.listarPersonal()
        .subscribe(
          res => this.personal = res,
          this.dtTrigger.next
        ) 
        
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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
    Swal.fire({
      title: 'Personal Eliminado',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {

        this.refreshList();

      }
    })

    //window.location.reload();
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

  editarPersonal(personal: any) { //despliego los datos del usuario asociados a un ID
    this.personalObj.id_persona = personal.id_persona;
    this.formValue.controls['id_persona'].setValue(personal.id_persona);
    this.formValue.controls['nombre'].setValue(personal.nombre);
    this.formValue.controls['apellido'].setValue(personal.apellido);
    this.formValue.controls['correo'].setValue(personal.correo);

    console.log(this.personalObj.id_persona)
  }


  modificarPersonal(personalObj: Personal) {

    this.personalObj.nombre = this.formValue.value.nombre;
    this.personalObj.apellido = this.formValue.value.apellido;
    this.personalObj.correo = this.formValue.value.correo;

    this.personalService.modificarPersonal(this.personalObj, this.personalObj.id_persona)
      .subscribe(res => {
        alert("Actualización Exitosa");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.listarPersonal();
      });
  }

  cancelar() {
    Swal.fire({
      title: 'Acción Cancelada',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/  listarPersonal']);
      }
    })
  }
}



