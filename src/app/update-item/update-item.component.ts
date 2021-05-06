
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  retriviedPost: any;

  constructor(private postService: PostService,
    private router: Router,
    private activatedroute:ActivatedRoute) { }
  id;
  ngOnInit() {
   this.id =this.activatedroute.snapshot.paramMap.get("postId");
    this.postService.getPostDetail(this.id)
    .subscribe(
      res => {
        this.retriviedPost = res;
        this.url = this.retriviedPost.fileUrl;
        console.log(this.retriviedPost);
      }
    );
  }

  post: Post = new Post();
  submitted = false;
  mimeType: File;
  message: string;

  form = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    postBody: new FormControl()
  });
  isSave = false;
  onSubmit(registerform): void {
    if (registerform === "Save") {
      this.post = new Post();
      this.post.title = this.title.value;
      this.post.description = this.description.value;
      this.post.postBody = this.postBody.value;
      this.submitted = true;

      this.savePost();
    }

  }

  savePost() {
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    //Update Post Details
    this.postService.updatePost(this.post, this.id)
      .pipe(first())
      .subscribe((post) => {
        if (post && this.mimeType != null && this.mimeType.name != "undefined") {
          const postStr = JSON.stringify(post);
          const obj = JSON.parse(postStr);
          // const id = obj.body.result.message
          uploadImageData.append('imageFile', this.mimeType, this.mimeType.name);
          console.log(this.mimeType);
          //Upload Image
          this.postService.updatePostImg(uploadImageData, this.id)
            .subscribe((response) => {
              if (response) {
                // this.message = 'Post Added Successfully';
                Utils.postUpdatedAlert();
             //   this.router.navigate(['/dashboard'])
              } else {
                Utils.oopsAlert();
               // this.message = 'Post Not Added Successfully';
              }
              // if (response) {
              //   this.message = 'Post uploaded successfully';
              //   this.router.navigate(['/dashboard'])
              // } else {
              //   this.message = 'Post not uploaded successfully';
              // }
            });
        } else {
          Utils.postUpdatedAlert();
        //  this.message = 'Post not uploaded successfully';
        }
      }
      );
    this.post = new Post();
  }

  updatePostPageRendering(id){
    this.postService.getPostDetail(id)
    .subscribe(
      res => {
        this.retriviedPost = res;
        console.log(this.retriviedPost);
      }
    );
  }


  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }

  get postBody() {
    return this.form.get('postBody');
  }

  get image() {
    return this.form.get('image');
  }

  url;
  msg = "";
  selectFile(event) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    this.mimeType = event.target.files[0];

    if (this.mimeType.type.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
  }

}
