import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { catchError, retry } from 'rxjs/operators';
import { DataTablesModule } from "angular-datatables";
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgToastModule } from 'ng-angular-popup';


import { AuthGuard } from './auth.guard';
import { ListarInventarioComponent } from './components/listar-inventario/listar-inventario.component';
import { ListarPersonalComponent } from './components/listar-personal/listar-personal.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { ModificarInventarioComponent } from './components/modificar-inventario/modificar-inventario.component';
import { ModificarPersonalComponent } from './components/modificar-personal/modificar-personal.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { RegistrarInventarioComponent } from './components/registrar-inventario/registrar-inventario.component';
import { RegistrarPersonalComponent } from './components/registrar-personal/registrar-personal.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { VistaUsuarioComponent } from './components/vista-usuario/vista-usuario.component';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectSearchModule } from 'mat-select-search';
import { MatSortModule } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasRoleGuard } from './has-role.guard';
import { CambioPasswordComponent } from './components/cambio-password/cambio-password.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ListarInventarioComponent,
    ListarPersonalComponent,
    ListarUsuariosComponent,
    LoginComponent,
    ModificarInventarioComponent,
    ModificarPersonalComponent,
    ModificarUsuarioComponent,
    RegistrarInventarioComponent,
    RegistrarPersonalComponent,
    RegistrarUsuarioComponent,
    VistaUsuarioComponent,
    CambioPasswordComponent,
    PerfilComponent,
    

  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    NgToastModule,
    MatTableModule,
    MatFormFieldModule,
    MatRippleModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconTestingModule,
    MatTooltipModule,
    MatToolbarModule,
    NgSelectModule,
    MatSelectSearchModule,
    MatSelectModule,
    MatTableExporterModule,
    
    

  ],
  providers: [
    AuthGuard,
    FormBuilder,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    HasRoleGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
