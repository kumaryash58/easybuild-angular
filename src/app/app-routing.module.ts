import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ForgotPasswerdComponent } from './forgot-passwerd/forgot-passwerd.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { TemplateListingComponent } from './template-listing/template-listing.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { TemplatePreviewComponent } from './template-preview/template-preview.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserGuard } from './_services';

const x = localStorage.getItem('currentUser');
let route = 'register';
if(x != null) {
  route = 'dashboard';
}
const routes: Routes = [
  { 
    path: '',
    component: AppComponent, 
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'template-preview', component: TemplatePreviewComponent, canActivate: [UserGuard] },
      { path: 'homepage', component: HomepageComponent },
      { path: '', component: HomepageComponent }
    ]
},
  { path: '', //\\redirectTo: route, pathMatch: 'full',
  component: DashboardLayoutComponent, 
  children: [
    {
      path: '',
      redirectTo: route,
      pathMatch: 'full'
    },
  { path: 'dashboard', component: DashboardComponent, canActivate: [UserGuard] },
  { path: 'add-item', component: AddItemComponent, canActivate: [UserGuard] },
  { path: 'forgot-passwerd', component: ForgotPasswerdComponent },
  { path: 'admin-profile', component: AdminProfileComponent, canActivate: [UserGuard] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [UserGuard] },
  { path: 'update-item', component: UpdateItemComponent, canActivate: [UserGuard] },
  { path: 'template-listing', component: TemplateListingComponent, canActivate: [UserGuard] },
  { path: 'create-template', component: CreateTemplateComponent, canActivate: [UserGuard] },
 
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
 
}
