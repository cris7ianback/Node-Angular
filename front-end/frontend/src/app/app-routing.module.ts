import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { TaskComponent } from './components/task/task.component';
import { PrivateTaskComponent } from './components/private-task/private-task.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: '/task', pathMatch: 'full' },
  { path: 'task', component: TaskComponent },
  { path: 'private', component: PrivateTaskComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
