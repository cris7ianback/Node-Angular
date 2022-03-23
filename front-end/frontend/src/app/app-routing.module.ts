import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//components

import { ListarPersonalComponent } from './components/listar-personal/listar-personal.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { RegistrarPersonalComponent } from './components/registrar-personal/registrar-personal.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'listarPersonal', pathMatch: 'full' },
  { path: 'listarPersonal', component: ListarPersonalComponent, canActivate: [AuthGuard] },
  { path: 'listarUsuarios', component: ListarUsuariosComponent, canActivate: [AuthGuard] },
  { path: 'registrarUsuario', component: RegistrarUsuarioComponent },
  { path: 'registrarPersonal', component: RegistrarPersonalComponent },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


