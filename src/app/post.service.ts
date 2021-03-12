import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = environment.baseUrl;
  email: any;
  constructor(private http:HttpClient) { }

  createPost(post: object): Observable<object> {
    this.email = localStorage.getItem("email");
    return this.http.post(`${this.baseUrl}post/upload/${this.email}`, post, { observe: 'response' })
    .pipe(map(post => {
      return post;
  }));
  }
  updatePost(post: object, id): Observable<object> {
    return this.http.post(`${this.baseUrl}post/updatePost/${id}`, post, { observe: 'response' })
    .pipe(map(post => {
      return post;
  }));
  }

  updatePostImg(post: object, id): Observable<object> {
    return this.http.post(`${this.baseUrl}post/updatePostImage/${id}`, post, { observe: 'response' });
  }
  
  getAllPost(){
    this.email = localStorage.getItem("email");
    return this.http.get(`${this.baseUrl}post/getAllPosts/${this.email}`);
  }

  getPostDetail(id){
    return this.http.get(`${this.baseUrl}post/getPostDetail/${id}`);
  }
  
}
