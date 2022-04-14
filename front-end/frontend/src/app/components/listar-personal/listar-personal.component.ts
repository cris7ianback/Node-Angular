import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { Personal } from 'src/app/models/personal';
import { PersonalService } from 'src/app/services/personal.service';
import { ModificarPersonalComponent } from '../modificar-personal/modificar-personal.component';
import { RegistrarUsuarioComponent } from '../registrar-usuario/registrar-usuario.component';
import { RegistrarPersonalComponent } from '../registrar-personal/registrar-personal.component';

@Component({
  selector: 'app-listar-personal',
  templateUrl: './listar-personal.component.html',
  styleUrls: ['./listar-personal.component.css']
})
export class ListarPersonalComponent implements  OnInit {

  private URL = 'http://localhost:3000/'
  estado?: boolean;
  estado2?: boolean;
  
  row: any;
  currentPersonal: Personal = {}
  currentIndex = -1;
  id_persona?: any;
  listarPersonal?: any;
  personal: any = [];
  
  personalForm?: FormGroup;
  
  
  listPersonal!: Observable<Personal>;
  
  displayedColumns: string[] = ['id_persona', 'nombre', 'apellido', 'correo', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router,
              private toast: NgToastService,
              private _personalService: PersonalService,
              private http: HttpClient,
              private dialog: MatDialog ) { }

 

  ngOnInit(): void {

    this.http.get<any>(this.URL + 'isEditOrAdmin')
      .subscribe(
        res => {
          console.log(res.status);
        },
        err => {
          if (err.status !== 200) {
            this.estado = false
            this.toast.error({
              detail: "Acceso Denegado",
              summary: "Solo personal Autorizado puede acceder",
              duration: 3000,
              position: 'br'
            })

            this.router.navigate(['vistaUsuario'])
          }
          this.estado = true
        });

    this.cargarPersonal();
    this._personalService.listarPersonal().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);      
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
            detail: "Accion Ejecutada",
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

  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['/listarPersonal']);
  }

  editPersonal(row: any) {
    this.dialog.open(ModificarPersonalComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'Modificar Personal') {
        this.refreshList();
      }
    })
  }

  registrarPersonal() {
    this.dialog.open(RegistrarPersonalComponent, {
      width: '30%'
    }).afterClosed().subscribe(val =>{
      if (val === 'guardar'){
        this.cargarPersonal()
      }
    });
  }

  registrarUsuario() {
    this.dialog.open(RegistrarUsuarioComponent, {
      width: '30%'
    }).afterClosed().subscribe(val =>{
      if (val === 'guardar'){
        this.cargarPersonal()
      }
    });
  }

}


