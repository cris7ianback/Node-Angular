import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


import { Personal } from 'src/app/models/personal';
import { PersonalService } from 'src/app/services/personal.service';
import { ModificarPersonalComponent } from '../modificar-personal/modificar-personal.component';
import { RegistrarUsuarioComponent } from '../registrar-usuario/registrar-usuario.component';
import { RegistrarPersonalComponent } from '../registrar-personal/registrar-personal.component';
import { CambioPasswordComponent } from '../cambio-password/cambio-password.component';

@Component({
  selector: 'app-listar-personal',
  templateUrl: './listar-personal.component.html',
  styleUrls: ['./listar-personal.component.css']
})
export class ListarPersonalComponent implements OnInit {

  private URL = 'http://localhost:3000/'

  estado?: boolean;
  currentPersonal: Personal = {}
  currentIndex = -1;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id_persona', 'nombre', 'apellido', 'correo', 'acciones'];
  id_persona?: any;
  listarPersonal?: any;
  listPersonal!: Observable<Personal>;
  //personal: any = [];
  personalForm?: FormGroup;
  row: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
              private http: HttpClient,
              private _personalService: PersonalService,
              private router: Router,
              private toast: NgToastService ) { }

  ngOnInit(): void {

    //aquí veriricamos si es Usuario o Administrador.

    this.http.get<any>(this.URL + 'isEditOrAdmin')
      .subscribe(
        res => {
        },
        err => {
          // Si intenta ingresar alguna ruta y no es Administrador, salta alerta la cual lo devuelve a la vista Usuario
          if (err.status !== 200) {
            this.estado = false
            this.toast.error({
              detail: "Acceso Denegado",
              summary: "Solo personal Autorizado puede acceder",
              duration: 3000,
              position: 'br'
            })
            
            this.router.navigate(['vistaUsuario'])
              //navega a ruta VistaUsuario
          }
          this.estado = true
        });

        //carga la lista personal
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

    //aplica filtro para la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //refresca la lista 
  refreshList(): void {
    window.location.reload();
    this.currentPersonal = {};
    this.currentIndex = -1;
  }

  //elimina personal.
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
          this.refreshList();
        },
        error => {
          this.toast.warning({
            detail: "Atencion",
            summary: "Personal Eliminado",
            duration: 2000,
            position: 'br'
          })
        })
  }

  //cancela acción.
  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['/listarPersonal']);
  }
  //edita Personal en listar personal.
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

  //Modal Registra Personal
  registrarPersonal() {
    this.dialog.open(RegistrarPersonalComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'Registrar Personal') {
        this.refreshList();
      }
    });
  }
//Modal Registra Usuario
  registrarUsuario() {
    this.dialog.open(RegistrarUsuarioComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'Registrar Usuario') {
        this.refreshList();
      }
    });
  }

  cambioPass() {
    this.dialog.open(CambioPasswordComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'Registrar Usuario') {
        this.refreshList();
      }
    });
  }

}


