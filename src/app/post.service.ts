import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = environment.baseUrl;
  email: any;
  constructor(private http:HttpClient) { }

  createPost(post: object): Observable<object> {
    return this.http.post(`${this.baseUrl}` + 'post/upload', post, { observe: 'response' });
  }
  
  getAllPost(){
    this.email = localStorage.getItem("email");
    return this.http.get(`${this.baseUrl}post/getAllPosts/${this.email}`);
  }
}
