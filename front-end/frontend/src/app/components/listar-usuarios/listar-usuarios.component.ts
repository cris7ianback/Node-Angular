import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import {MatIconTestingModule} from '@angular/material/icon/testing';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  currentUsuario: Users = {};
  currentIndex = -1;
  id_user?: any;
  listarUsuarios?: any;
  usuarios: any = [];
  usuario?: any;
  currentPersonal?: {};

  //listUsuarios: Users[] = [];
  listUsuarios!: Observable<Users[]> ;

  displayedColumns: string[] = ['id_user', 'user', 'email', 'id_role', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toast: NgToastService,
    private _usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this._usuarioService.listarUsuarios().subscribe(res => {
      // Use MatTableDataSource for paginator
      this.dataSource = new MatTableDataSource(res);
                            
      // Assign the paginator *after* dataSource is set
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
  setActiveUsuario(users: Users, index: number): void {
    this.currentUsuario = users;
    this.currentIndex = index;
  }
  //envia a Pagina Modificar
  modificarUsuario(id_user: any) {
    this.router.navigate(['modificarUsuario/:id_user']);
  }
// cancela la acción
  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['/listarUsuarios']);
  }

}

