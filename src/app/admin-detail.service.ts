import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminDetailService {
  private baseUrl = environment.baseUrl;
  email: any;
  constructor(private http:HttpClient) { }

  createPartner(partner: object): Observable<object> {
    return this.http.post(`${this.baseUrl}` + 'users/signup', partner, { observe: 'response' });
  }

  getAdminDetails(): Observable<any> {
     this.email = localStorage.getItem("email");
    return this.http.get(`${this.baseUrl}users/adminDetails/${this.email}`);
  }

  updateAdminProfile(adminDetail: object) {
    return this.http.post(`${this.baseUrl}` + 'users/updateAdminProfile', adminDetail, {responseType: 'text'})
    .pipe(map(adminDetail => {
      if (adminDetail) {
     // this.currentUserSubject.next(user);
      }
      return adminDetail;
  }));
  }

  updateAdminProfilePic(adminDetail: object) {
    this.email = localStorage.getItem("email");
    const isProfilePic = 'true'; 
    return this.http.post(`${this.baseUrl}users/updateImage/${this.email}/${isProfilePic}`, adminDetail, {responseType: 'text'})
    .pipe(map(adminDetail => {
      if (adminDetail) {
         const obj = JSON.parse(adminDetail);
        localStorage.setItem('profileImgPath', obj.result.message);
     // this.currentUserSubject.next(user);
      }
      return adminDetail;
  }));
  }

  getPartnerList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getPartner(email: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/partner/${email}`);
  }


  deletePartner(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/partner-delete/${id}`, { responseType: 'text' });
  }
}
