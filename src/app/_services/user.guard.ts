import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements  CanActivate{
  constructor(private authenticationService: AuthenticationService,
    private router: Router){}
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
//https://medium.com/@amcdnl/authentication-in-angular-jwt-c1067495c5e0
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if(!this.authenticationService.isTokenExpired()){
      return true;
    }
    else{
      this.authenticationService.logout();
      return this.router.navigate(['/login']);
      // return this.router.parseUrl("/login");
    }
}
}