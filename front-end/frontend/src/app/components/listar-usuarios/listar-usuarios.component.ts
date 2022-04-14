import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Users } from 'src/app/models/users';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModificarUsuarioComponent } from '../modificar-usuario/modificar-usuario.component';
import { RegistrarUsuarioComponent } from '../registrar-usuario/registrar-usuario.component';
import { RegistrarPersonalComponent } from '../registrar-personal/registrar-personal.component';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
 
  private URL = 'http://localhost:3000/'
  estado?: boolean;

  row: any;
  currentUsuario: Users = {};
  currentIndex = -1;
  id_user?: any;
  listarUsuarios?: any;
  usuarios: any = [];
  usuario?: any;
  currentPersonal?: {};


  listUsuarios!: Observable<Users[]>;

  displayedColumns: string[] = ['id_user', 'user', 'email', 'id_role', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
              private usuarioService: UsuarioService,
              private router: Router,
              private toast: NgToastService,
              private _usuarioService: UsuarioService,
              private http: HttpClient,
              private dialog: MatDialog) {  }

  // registrarUsuario() {
  //   this.dialog.open(RegistrarUsuarioComponent, {
  //     width: '30%'
  //   }).afterClosed().subscribe(val => {
  //     if (val === 'guardar') {
  //       this.cargarUsuarios()
  //     }
  //   });
  // }

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
      if (val === 'guardar') {
        this.cargarUsuarios()
      }
    });
  }
  registrarPersonal() {
    this.dialog.open(RegistrarPersonalComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'guardar') {
        this.cargarUsuarios()
      }
    });
  }

}

