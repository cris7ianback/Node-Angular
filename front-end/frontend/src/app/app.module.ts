import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
  import { DataTablesModule } from "angular-datatables";
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgToastModule } from 'ng-angular-popup';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AuthGuard } from './auth.guard';
import { ListarPersonalComponent } from './components/listar-personal/listar-personal.component';
import { ListarInventarioComponent } from './components/listar-inventario/listar-inventario.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { ModificarPersonalComponent } from './components/modificar-personal/modificar-personal.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { RegistrarPersonalComponent } from './components/registrar-personal/registrar-personal.component';
import { VistaUsuarioComponent } from './components/vista-usuario/vista-usuario.component';
import { TokenInterceptorService } from './services/token-interceptor.service';


import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectSearchModule } from 'mat-select-search';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ModificarInventarioComponent } from './components/modificar-inventario/modificar-inventario.component';
import { IngresarInventarioComponent } from './components/ingresar-inventario/ingresar-inventario.component';
import { RegistrarInventarioComponent } from './components/registrar-inventario/registrar-inventario.component';









@NgModule({
  declarations: [
    AppComponent,
    ListarPersonalComponent,
    ListarUsuariosComponent,
    LoginComponent,
    ModificarPersonalComponent,
    ModificarUsuarioComponent,
    RegistrarPersonalComponent,
    RegistrarUsuarioComponent,
    VistaUsuarioComponent,
    ListarInventarioComponent,
    ModificarInventarioComponent,
    IngresarInventarioComponent,
    RegistrarInventarioComponent
    

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    MatIconModule,
    NgToastModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
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
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatTableExporterModule
    

  ],
  providers: [
    AuthGuard,
    FormBuilder,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
