import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminDetail } from '../admin-detail';
import { AdminDetailService } from '../admin-detail.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  gender = localStorage.getItem('gender');
  profileImgPath = localStorage.getItem('profileImgPath');
  retriviedAdmin: any;
  mimeType : File;

  constructor(
    private adminDetailService:AdminDetailService,
    private router: Router
  ) { }
 
  ngOnInit() {
    if(this.profileImgPath != null){
      this.url = this.profileImgPath;
    } else if (this.gender = 'Female') {
      this.url = "./assets/female-crop.png";
    }  
    this.getProfileDetails();
  }
  adminDetail : AdminDetail=new AdminDetail();
  submitted = false;
  loading = false;
  profileLoading = false;
  
  form=new FormGroup({
    firstName:new FormControl(),
    lastName:new FormControl(),
    email:new FormControl({disabled: true}, Validators.required),
    address:new FormControl(),
    city: new FormControl(),
    country: new FormControl(),
    mobileNo: new FormControl(),
    image:new FormControl()
  });
  register(registerform){

    this.adminDetail=new AdminDetail();
    this.adminDetail.firstName=this.firstName.value;
    this.adminDetail.lastName=this.lastName.value;
    this.adminDetail.email=this.email.value;
    this.adminDetail.address=this.address.value;
    this.adminDetail.city=this.city.value;
    this.adminDetail.country=this.country.value;
    this.adminDetail.mobileNo=this.mobileNo.value;
    this.adminDetail.image=this.image.value;
    this.submitted=true;
    this.save();
  }

  save() {
    this.loading = true;
    this.adminDetailService.updateAdminProfile(this.adminDetail)
      .subscribe(data => {
        this.router.navigate(['/admin-profile'])
        window.location.reload();
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
          console.log(this.retriviedAdmin);
         }
       );
   }
   
   keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  url;
	msg = "";
  success = "";
	selectFile(event) {
    this.profileLoading = true;
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		  this.mimeType = event.target.files[0];
		
		if (this.mimeType.type.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
    const uploadImageData = new FormData(); 
    uploadImageData.append('imageFile', this.mimeType, this.mimeType.name);
    console.log(this.mimeType);
    this.adminDetailService.updateAdminProfilePic(uploadImageData)
      .subscribe(data => {
        this.profileLoading = false;
        this.success = "Profile Pic Updated";
       window.location.reload();
      },
      error => {
          this.profileLoading = false;
      });

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

  get address(){
    return this.form.get('address');
  }

  get city(){
    return this.form.get('city');
  }

  get country(){
    return this.form.get('country');
  }

  get mobileNo(){
    return this.form.get('mobileNo');
  }

  get image(){
    return this.form.get('image');
  }

}
