import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminDetail } from '../admin-detail';
import { AdminDetailService } from '../admin-detail.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

gender = localStorage.getItem('gender');
  userName = localStorage.getItem('username');
  retriviedAdmin: any;
  genderName: any;
  constructor(
    private adminDetailService:AdminDetailService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  adminDetail : AdminDetail=new AdminDetail();
  submitted = false;
  loading = false;
  

  form=new FormGroup({
    firstname:new FormControl(),
    lastname:new FormControl(),
    email:new FormControl(),
    city: new FormControl(),
    country: new FormControl()
  });
  register(registerform){

    this.adminDetail=new AdminDetail();
    this.adminDetail.firstname=this.firstname.value;
    this.adminDetail.lastname=this.lastname.value;
    this.adminDetail.email=this.email.value;
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


  getProfileDetails() {
    this.adminDetailService.getAdminDetails()
       .subscribe(
         res => {
          this.retriviedAdmin = res;
         }
       );
   }

   get firstname(){
    return this.form.get('firstname');
  }

  get lastname(){
    return this.form.get('lastname');
  }

  get email(){
    return this.form.get('email');
  }

  get city(){
    return this.form.get('city');
  }

  get country(){
    return this.form.get('country');
  }

}
