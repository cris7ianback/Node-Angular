import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { InventarioServices } from 'src/app/services/inventario.service';
import { Inventario } from 'src/app/models/inventario';
import { ModificarInventarioComponent } from '../modificar-inventario/modificar-inventario.component';
import { RegistrarUsuarioComponent } from '../registrar-usuario/registrar-usuario.component';
import { RegistrarPersonalComponent } from '../registrar-personal/registrar-personal.component';
import { RegistrarInventarioComponent } from '../registrar-inventario/registrar-inventario.component';

@Component({
  selector: 'app-listar-inventario',
  templateUrl: './listar-inventario.component.html',
  styleUrls: ['./listar-inventario.component.css']
})
export class ListarInventarioComponent implements OnInit {

  private URL = 'http://localhost:3000/'

  currentPersonal?: {};
  currentIndex = -1;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombre', 'cantidad', 'unidad', 'acciones'];
  estado?: boolean;
  listInventario!: Observable<Inventario[]>;
  row: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private inventarioService: InventarioServices,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {

    this.cargarInventario();
    this.inventarioService.listarInventario().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  cargarInventario() {
    this.listInventario = this.inventarioService.listarInventario();
  }

  eliminarInventario( id_inventario: any): void{
    this.inventarioService.eliminarInventario(id_inventario)
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
      error =>{
        console.log(error);
        this.toast.warning({
          detail: "Atencion",
          summary: "Personal Eliminado",
          duration: 2000,
          position: 'br'
        })

      }
    )

  }

  editInventario (row: any){
    this.dialog.open(ModificarInventarioComponent,{
      width:'30%',
      data: row
    }).afterClosed().subscribe(val =>{
      if (val === 'Modificar Producto'){
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
  registrarInventario() {
    this.dialog.open(RegistrarInventarioComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'Registrar Producto') {
        this.refreshList();
      }
    });
  }
  refreshList(): void {
    window.location.reload();
    this.currentPersonal = {};
    this.currentIndex = -1;
  }




}
