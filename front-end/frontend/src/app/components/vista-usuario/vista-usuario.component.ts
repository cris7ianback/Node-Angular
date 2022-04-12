import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { Personal } from 'src/app/models/personal';
import { Router } from '@angular/router';
import { PersonalService } from '../../services/personal.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.css']
})
export class VistaUsuarioComponent implements OnInit {

  listPersonal!: Observable<Personal>;
  displayedColumns: string[] = ['id_persona', 'nombre', 'apellido', 'correo'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router,
    private toast: NgToastService,
    private _personalService: PersonalService,
    public authService: AuthService) { }

  ngOnInit(): void {

    this.cargarUsuarios();
       this._personalService.listarPersonal()
       .subscribe (res => {
        
      // Use MatTableDataSource for paginator
      this.dataSource = new MatTableDataSource(res);
                            
      // Assign the paginator *after* dataSource is set
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  cargarUsuarios() {
    this.listPersonal = this._personalService.listarPersonal();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
