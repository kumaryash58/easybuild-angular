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
  userName = localStorage.getItem('username');
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  
}
