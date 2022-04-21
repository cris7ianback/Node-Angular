import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//components
//import { AuthGuard } from './auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { ListarPersonalComponent } from './components/listar-personal/listar-personal.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { ModificarPersonalComponent } from './components/modificar-personal/modificar-personal.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { RegistrarPersonalComponent } from './components/registrar-personal/registrar-personal.component';
import { VistaUsuarioComponent } from './components/vista-usuario/vista-usuario.component';
import { ListarInventarioComponent } from './components/listar-inventario/listar-inventario.component';
import { HasRoleGuard } from './has-role.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'login', redirectTo: 'login', pathMatch: 'full' },
  //{ path: 'listarPersonal',                 component: ListarPersonalComponent, canActivate: [AuthGuard] },
  { path: 'listarPersonal',                 component: ListarPersonalComponent, canActivate: [AuthGuard] },
  { path: 'listarUsuarios',                 component: ListarUsuariosComponent, canActivate: [AuthGuard] },
  { path: 'registrarUsuario',               component: RegistrarUsuarioComponent,  canActivate:[RoleGuard] ,data: { expectedRole: 'admin'}},
  //{ path: 'registrarPersonal',              component: RegistrarPersonalComponent, canActivate: [AuthGuard] },
  { path: 'registrarPersonal',              component: RegistrarPersonalComponent, data: { expectedRole: 'admin'} },
  { path: 'login',                          component: LoginComponent },
  { path: 'modificarPersonal/:id_persona',  component: ModificarPersonalComponent, canActivate: [AuthGuard] },
  { path: 'modificarUsuario/:id_user',      component: ModificarUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'vistaUsuario',                   component: VistaUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'listarInventario',              component: ListarInventarioComponent, canActivate: [AuthGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


