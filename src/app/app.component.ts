import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDetail } from './admin-detail';
import { AuthenticationService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FormSubmit';
  currentUser: AdminDetail;
 gender = localStorage.getItem('gender');
 firstName = localStorage.getItem('firstName');
 lastName = localStorage.getItem('lastName');
 profileImgPath = localStorage.getItem('profileImgPath');
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  url
  ngOnInit() {
    if(this.profileImgPath != null){
      this.url = this.profileImgPath;
    } else if (this.profileImgPath == null || this.profileImgPath == "undefined" || this.gender == 'Female') {
      this.url = "./assets/female-crop.png";
    } 
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  
}
