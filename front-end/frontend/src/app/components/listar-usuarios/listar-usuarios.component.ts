import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Users } from 'src/app/models/users';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModificarUsuarioComponent } from '../modificar-usuario/modificar-usuario.component';
import { RegistrarUsuarioComponent } from '../registrar-usuario/registrar-usuario.component';
import { RegistrarPersonalComponent } from '../registrar-personal/registrar-personal.component';
import { ListarPersonalComponent } from '../listar-personal/listar-personal.component';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  private URL = 'http://localhost:3000/'
  
  currentPersonal?: {};
  currentIndex = -1;
  estado?: boolean;
  id_user?: any;
  listUsuarios!: Observable<Users[]>;
  listarUsuarios?: any;
  row: any;
  //usuario?: any;

  displayedColumns: string[] = ['id_user', 'user', 'email', 'id_role', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
              private dialog: MatDialog,
              private http: HttpClient,
              private router: Router,
              private usuarioService: UsuarioService,
              private _usuarioService: UsuarioService,
              private toast: NgToastService,
              ){ }


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

    this.cargarUsuarios();
    this._usuarioService.listarUsuarios().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  cargarUsuarios() {
    this.listUsuarios = this._usuarioService.listarUsuarios();
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

  eliminarUsuario(id_user: any): void {
    this.usuarioService.eliminarUsuario(id_user)
      .subscribe(
        res => {
          this.toast.success({
            detail: "Accion Ejecutada",
            summary: "Usuario Eliminado",
            duration: 2000,
            position: 'br'
          })
          console.log(res)
          this.refreshList();
        },
        error => {
          console.log(error);
          this.toast.warning({
            detail: "Atencion",
            summary: "Personal Eliminado",
            duration: 2000,
            position: 'br'
          })
        
        })

  }
  // cancelar acción
  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['/listarUsuarios']);
  }

  editUsuarios(row: any) {
    this.dialog.open(ModificarUsuarioComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'Modificar Usuario') {
        this.refreshList();
      }
    })
  }

  registrarUsuario() {
    this.dialog.open(RegistrarUsuarioComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'Registrar Usuario') {
        this.refreshList();
      }
    });
  }
  registrarPersonal() {
    this.dialog.open(RegistrarPersonalComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'Registrar Personal') {
        this.refreshList();
      }
    });
  }

  deleteUsuario (){
    this.dialog.open( ListarPersonalComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === ' Eliminar Personal') {
        this.refreshList();
      }
    });
    }




}

