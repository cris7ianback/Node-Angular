import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';



import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { RegistrarPersonalComponent } from './components/registrar-personal/registrar-personal.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { ListarPersonalComponent } from './components/listar-personal/listar-personal.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { ModificarPersonalComponent } from './components/modificar-personal/modificar-personal.component';





@NgModule({
  declarations: [
    AppComponent,
    ListarPersonalComponent,
    LoginComponent,
    RegistrarUsuarioComponent,
    ListarUsuariosComponent,
    RegistrarPersonalComponent,
    ModificarUsuarioComponent,
    ModificarPersonalComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,

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
