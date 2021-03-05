import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminDetail } from '../admin-detail';
import { AdminDetailService } from '../admin-detail.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
email = localStorage.getItem("email");
    title:string; 
    description:string;
    image: string;
    retrievedImage: any;
      base64Data: any;
      retrieveResonse: any;
      message: string;
      imageName: any;
      retriviedPosts: any;
  constructor(
    private postService: PostService,
    private adminDetailService: AdminDetailService,
    private httpClient: HttpClient) { }
  partners: Observable<AdminDetail[]>;
  partner : AdminDetail=new AdminDetail();
  ngOnInit() {
    // this.adminDetailService.getPartnerList().subscribe(data =>{
    //   this.partners =data;
    //   })
      // this.adminDetailService.getPartner(this.email)
      // .subscribe(
      //   data => {
      //     this.partners =data;         
      //   })
        this.getImage();
  }

  getImage() {
   // const headers = new HttpHeaders({'Authorization': 'Bearer ' });
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.postService.getAllPost()
      .subscribe(
        res => {
          this.retriviedPosts = res;
          this.base64Data = this.retriviedPosts[0].picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  // getPartnerDetail(id: number){
  //   this.adminDetailService.getPartner(id)
  //     .subscribe(
  //       data => {
  //         this.studentlist=data           
  //       },
  //       error => console.log(error));
  // }

}
