import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AdminDetail } from '../admin-detail';
import { AdminDetailService } from '../admin-detail.service';
import { TemplateListingComponent } from '../template-listing/template-listing.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private adminDetailService:AdminDetailService,
    private router: Router,
    public matDialog: MatDialog
    ) { }

  ngOnInit() {
  }

  adminDetail : AdminDetail=new AdminDetail();
  submitted = false;
  loading = false;

  form=new FormGroup({
    firstName:new FormControl(),
    lastName:new FormControl(),
    email:new FormControl(),
    password:new FormControl(),
    gender: new FormControl(),
    city: new FormControl(),
    country: new FormControl()
  });

  register(registerform){
    // console.log(this.adminDetailName.value);
    // console.log(this.adminDetailEmail.value);

    this.adminDetail=new AdminDetail();
    this.adminDetail.firstName=this.firstName.value;
    this.adminDetail.lastName=this.lastName.value;
    this.adminDetail.email=this.email.value;
    this.adminDetail.password=this.password.value;
    this.adminDetail.gender=this.gender.value;
    this.adminDetail.city=this.city.value;
    this.adminDetail.country=this.country.value;
    this.submitted=true;
    this.save();
  }

  save() {
    this.loading = true;
    this.adminDetailService.createPartner(this.adminDetail)
      .subscribe(data => {
        this.router.navigate(['/login'])
      },
      error => {
          this.loading = false;
      });
    this.adminDetail = new AdminDetail();
  }

  get firstName(){
    return this.form.get('firstName');
  }

  get lastName(){
    return this.form.get('lastName');
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  get gender(){
    return this.form.get('gender');
  }

  get city(){
    return this.form.get('city');
  }

  get country(){
    return this.form.get('country');
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "template-listing";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(TemplateListingComponent, dialogConfig);
  }

}
