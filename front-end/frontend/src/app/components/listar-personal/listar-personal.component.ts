import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

import { Observable, Subject } from 'rxjs';

import { Personal } from 'src/app/models/personal';
import { PersonalService } from 'src/app/services/personal.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';





@Component({
  selector: 'app-listar-personal',
  templateUrl: './listar-personal.component.html',
  styleUrls: ['./listar-personal.component.css']
})
export class ListarPersonalComponent implements OnDestroy, OnInit {

  listPersonal!: Observable<Personal>;
  displayedColumns: string[] = ['id_persona', 'nombre', 'apellido', 'correo','acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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



  constructor(private _personalService: PersonalService,
              private router: Router,
              private formbuilder: FormBuilder,
              private toast:  NgToastService) { }


  ngOnInit(): void {
    this.cargarPersonal();
    this._personalService.listarPersonal().subscribe (res => {

      this.dataSource = new MatTableDataSource(res);
                            
      // Assign the paginator *after* dataSource is set
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })    
        
  }

  cargarPersonal() {
    this.listPersonal = this._personalService.listarPersonal();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    this._personalService.eliminarPersonal(id_persona)
      .subscribe(
        res => {
          this.toast.success({
            detail: "",
            summary: "Personal Eliminado",
            duration: 2000,
            position: 'br'
          })
          console.log(res)
        },
        error => {
          console.log(error);
          this.toast.warning({
            detail: "Atencion",
            summary: "Personal Eliminado",
            duration: 2000,
            position: 'br'
          })
          this.refreshList();
        })

  }
 
  buscarPorNombre(): void {
    this._personalService.buscarPorNombre(this.listarPersonal)
      .subscribe(
        data => {
          this.listarPersonal = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  
  modificarPersonal(id_persona: any) {
    this.router.navigate(['modificarPersonal/:id_persona']);
  }

  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['/listarPersonal']);
  }

}


