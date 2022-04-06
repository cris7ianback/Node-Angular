import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Users, Usuario } from 'src/app/models/users';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  //DATA TABLE
  displayedColumns: string[] = ['id_user', 'user', 'email', 'id_role'];
  dataSource!: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //FIN DATA TABLE


  currentUsuario: Users = {};
  currentIndex = -1;
  id_user?: string;
  //listarUsuarios?: any;
  //usuarios: any = [];
  data?:any;
  usuario: any = [];
  currentPersonal?: {};


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toast: NgToastService) {
  }

  ngOnInit(): void {

    this.listarUsuarios();

    // this.usuarioService.listarUsuarios()
    //   .subscribe(
    //     res => {
    //       console.log(res)
    //       this.dataSource = new MatTableDataSource()
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;

    //       this.usuario = <any>res;
    //     },
    //     err => console.log(err)
    //   );

  }



  listarUsuarios() {
    this.usuarioService.listarUsuarios()
      .subscribe(data => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
        //   error: (err)=>{
        //     alert("error")
        //   }
        // })
      )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

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

  modificarUsuario(id_user: any) {
    this.router.navigate(['modificarPersonal/:id_user']);
  }

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




