import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AdminDetail } from '../admin-detail';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import jwt_decode from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<AdminDetail>;
    public currentUser: Observable<AdminDetail>;
    private baseUrl = environment.baseUrl;
    message: string;
    isLoggedIn=false;
    
    authToken: any;
    user: any;
    tokenSubscription = new Subscription()
    timeout;
    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<AdminDetail>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): AdminDetail {
        return this.currentUserSubject.value;
    }

    login(email, password) {
       // localStorage.setItem('email', email);
        return this.http.post(`${this.baseUrl}userAuth/authenticate`, { email, password }, {responseType: 'text'})
            .pipe(map(partner => {
                if (partner) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if(partner != null && partner != ""){
                localStorage.setItem('currentUser', JSON.stringify(partner));
                // localStorage.setItem('token', partner);
                localStorage.setItem('email', email);
                
                var obj = JSON.parse(partner);
                let tokenStr =  obj.data.token;//this.partner.token;
                localStorage.setItem('token', tokenStr);
                localStorage.setItem('gender', obj.data.gender);
                localStorage.setItem('userId', obj.data.userId);
                localStorage.setItem('firstName', obj.data.firstName);
                localStorage.setItem('lastName', obj.data.lastName);
                localStorage.setItem('profileImgPath', obj.data.profileImgPath);
                this.isLoggedIn=true;
                } else{
                    this.logout()
                }
                }
                return partner;
            }));
    }

    getToken(): string {
        return localStorage.getItem('token');
      }

      getTokenExpirationDate(token: string): Date {
        let tokenInfo = this.getDecodedAccessToken(token); // decode token
        let expireDate = tokenInfo.exp; // get token expiration dateTime
       console.log(tokenInfo);
        if (expireDate=== undefined) return null;
    
        const date = new Date(0); 
        date.setUTCSeconds(expireDate);
        return date;
      }

      getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
      }
    
      isTokenExpired(token?: string): boolean {
        if(!token) token = this.getToken();
        if(!token) return true;
    
        const date = this.getTokenExpirationDate(token);
        if(date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
      }

    forgotPasswerd(email) {
        // localStorage.setItem('email', email);
         return this.http.get(`${this.baseUrl}` + `userAuth/forgotPasswerd/${email}`);
            //  .pipe(map(response => {
            //     if (response) {
            //         this.message = 'Email Sent Successfully';
            //         this.router.navigate(['/login'])
            //       } else {
            //         this.message = 'Email Not Sent';
            //       }
            //  }));
     }
    // login(user): Observable<AdminDetail> {
    //     let email = user.email;
    //     let password = user.password;
    //     return this.http.post<any>(this.baseUrl+'signin',user).pipe(
    //      map(user => {
    //         sessionStorage.setItem('email',user.email);
    //         let tokenStr= 'Bearer '+user.token;
    //         sessionStorage.setItem('token', tokenStr);
    //         return user;
    //        }
    //      )
    //     );
    //   }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.currentUserSubject.next(null);
    }
}