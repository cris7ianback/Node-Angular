import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';

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

    this.taskServices.listarPersonal()
      .subscribe(
        res => {
          console.log(res)
          this.personal = <any>res;
        },
        err => console.log(err)
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


