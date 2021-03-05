import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AdminDetail } from '../admin-detail';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<AdminDetail>;
    public currentUser: Observable<AdminDetail>;
    private baseUrl = environment.baseUrl;
    message: string;

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
                localStorage.setItem('currentUser', JSON.stringify(partner));
                // localStorage.setItem('token', partner);
                localStorage.setItem('email', email);
                
                var obj = JSON.parse(partner);
                let tokenStr =  obj.token;//this.partner.token;
                localStorage.setItem('token', tokenStr);
                localStorage.setItem('gender', obj.gender);
                localStorage.setItem('username', obj.username);
               // this.currentUserSubject.next(user);
                }
                return partner;
            }));
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