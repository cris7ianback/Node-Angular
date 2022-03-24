import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listar-personal',
  templateUrl: './listar-personal.component.html',
  styleUrls: ['./listar-personal.component.css']
})
export class ListarPersonalComponent implements OnInit {

  personal: any = [];

  constructor(private taskServices: TasksService,
    private router: Router) { }

  ngOnInit() {

  //   this.taskServices.listarPersonal()
  //     .subscribe(
  //       res => {
  //         console.log(res)
  //         this.personal = <any>res;
  //       },
  //       err => console.log(err)
  //     )
    this.taskServices.listarPersonal()
    .subscribe(
      res => this.personal = res,
      err  => {
        if (err instanceof HttpErrorResponse){
          if (err.status === 401){
            this.router.navigate(['/signin']);
          }
        }
      }
    )

  
}

  eliminarPersonal(id_persona: any): void {
    this.taskServices.eliminarPersonal(id_persona)
      .subscribe(
        res => {
          console.log(res)
        },
        err => {
          console.log(err)
        });
    window.location.reload();
  }
}


