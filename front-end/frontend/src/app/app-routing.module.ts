import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//components

import { AuthGuard } from './auth.guard';
import { ListarPersonalComponent } from './components/listar-personal/listar-personal.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { RegistrarPersonalComponent } from './components/registrar-personal/registrar-personal.component';
import { ModificarPersonalComponent } from './components/modificar-personal/modificar-personal.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'listarPersonal', component: ListarPersonalComponent },
  { path: 'listarUsuarios', component: ListarUsuariosComponent, canActivate: [AuthGuard] },
  { path: 'registrarUsuario', component: RegistrarUsuarioComponent },
  { path: 'registrarPersonal', component: RegistrarPersonalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'modificarPersonal/:id_persona', component: ModificarPersonalComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


