import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddItemComponent } from './add-item/add-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDialogModule, MatDialogRef, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MAT_DIALOG_DATA } from '@angular/material';
import { AuthInterceptor } from './auth.interceptor';
import { ForgotPasswerdComponent } from './forgot-passwerd/forgot-passwerd.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { TemplateListingComponent } from './template-listing/template-listing.component';

import { CreateTemplateComponent } from './create-template/create-template.component';
import { TemplatePreviewComponent } from './template-preview/template-preview.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './homepage/homepage.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './spinner/spinner.component';
import { SiteEditorComponent } from './site-editor/site-editor.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AddItemComponent,
    ForgotPasswerdComponent,
    AdminProfileComponent,
    EditProfileComponent,
    UpdateItemComponent,
    TemplateListingComponent,
    CreateTemplateComponent,
    TemplatePreviewComponent,
    HeaderComponent,
    FooterComponent,
    DashboardLayoutComponent,
    HomepageComponent,
    SpinnerComponent,
    SiteEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    EditorModule,
    MatDialogModule,
    NgbModule,
    MatMenuModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
     
    },
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }  
  ],
  bootstrap: [AppComponent],
  entryComponents: [TemplateListingComponent]
})
export class AppModule { }
