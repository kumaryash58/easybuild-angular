import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    return this.http.get(`${this.baseUrl}users/${this.email}`);
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
