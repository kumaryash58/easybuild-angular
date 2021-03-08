import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ForgotPasswerdComponent } from './forgot-passwerd/forgot-passwerd.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const x = localStorage.getItem('currentUser');
let route = 'register';
if(x != null) {
  route = 'dashboard';
}
const routes: Routes = [
 
  { path: '', redirectTo: route, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'forgot-passwerd', component: ForgotPasswerdComponent },
  { path: 'admin-profile', component: AdminProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
 
}
