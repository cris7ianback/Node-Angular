import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ListarPersonalComponent } from './components/listar-personal/listar-personal.component';

import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';


@NgModule({
  declarations: [
    AppComponent,
    ListarPersonalComponent,
    LoginComponent,    
    RegistrarUsuarioComponent,
    TasksComponent,
    ListarUsuariosComponent,
    RegistrarUsuarioComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
