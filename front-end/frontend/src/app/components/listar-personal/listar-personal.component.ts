import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/app/services/personal.service';

import { Personal } from 'src/app/models/personal';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-listar-personal',
  templateUrl: './listar-personal.component.html',
  styleUrls: ['./listar-personal.component.css']
})
export class ListarPersonalComponent implements OnInit {

  currentPersonal: Personal = {}
  currentIndex = -1;
  listarPersonal?: any;
  personal?: any;
  id_persona?: string;
  //personal: any = [];
  

  constructor( private personalService: PersonalService,
               private router: Router ) { }

  ngOnInit(): void {

    //   this.taskServices.listarPersonal()
    //     .subscribe(
    //       res => {
    //         console.log(res)
    //         this.personal = <any>res;
    //       },
    //       err => console.log(err)
    //     )

    this.personalService.listarPersonal()
      .subscribe(
        res => this.personal = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
        }
      )
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
    console.log ('Persona eliminada:' , id_persona)
    this.personalService.eliminarPersonal(id_persona)
      .subscribe(
        response => {
         // this.refreshList();
          console.log(response)
        },
        err => {
          console.log(err)
        });
    window.location.reload();
  }

  buscarPorNombre(): void {
    this.personalService.buscarPorNombre(this.listarPersonal)
    .subscribe(
      data => {
        this.listarPersonal = data;
        console.log(data);
      },
      error =>{
        console.log (error);
      });
  }
  modificarPersonal(id_persona: any) {
    this.router.navigate(['edit/:id_persona']);

  }



}

