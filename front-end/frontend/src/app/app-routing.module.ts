import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//components

import { ListarPersonalComponent } from './components/listar-personal/listar-personal.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';

import { AuthGuard } from './auth.guard';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';

const routes: Routes = [
  { path: '', redirectTo: 'listarPersonal', pathMatch: 'full' },
  { path: 'listarPersonal', component: ListarPersonalComponent, canActivate: [AuthGuard] },
  { path: 'listarUsuarios', component: ListarUsuariosComponent, canActivate: [AuthGuard] },
  { path: 'registrarUsuario', component: RegistrarComponent },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


