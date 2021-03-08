import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



import { AuthenticationService } from './_services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    if(localStorage.getItem('token') != null){
    req = req.clone({
      setHeaders: {
      //  'Content-Type' : 'multipart/form-data',//'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
    return next.handle(req);
  //   .subscribe(err => {
  //     // onError
  //     console.log(err);
  //     if (err instanceof HttpErrorResponse) {
  //         console.log(err.status);
  //         console.log(err.statusText);
  //         if (err.status === 401) {
  //             window.location.href = "/login";
  //         }
  //     }
  //     return Observable.throw(err);
  // }) as any;
}
}