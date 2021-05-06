import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private postService: PostService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
   // this.message ="hello"
  }
  
  post : Post=new Post();
  submitted = false;
  mimeType : File;
  message: string;

  form=new FormGroup({
    title:new FormControl(),
    description:new FormControl(),
    postBody:new FormControl(),
    image:new FormControl()
  });
  isSave = false;
  onSubmit(registerform): void {
    if(registerform==="Save") {  
    this.post=new Post();
    this.post.title=this.title.value;
    this.post.description=this.description.value;
    this.post.postBody=this.postBody.value;
    this.post.image=this.image.value;
    this.submitted=true;
    
    this.savePost();
    }

}

  savePost() {
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    this.spinner.show();
    const uploadImageData = new FormData(); 
    //Update Post Details
    this.postService.createPost(this.post)
    .pipe(first())
    .subscribe((post) => {
      if (post) {
        // const obj = JSON.parse(post.result);
        // localStorage.setItem('profileImgPath', obj.result.message);
        const postStr = JSON.stringify(post);
        const obj = JSON.parse(postStr);
        const id =  obj.body.result.message
    uploadImageData.append('imageFile', this.mimeType, this.mimeType.name);
    console.log(this.mimeType);
     //Upload Image
    this.postService.updatePostImg(uploadImageData, id)
    .subscribe((response) => {
      if (response) {
        // this.message = 'Post Added Successfully';
        Utils.postAddedAlert();
        this.router.navigate(['/dashboard'])
      } else {
        Utils.oopsAlert();
       // this.message = 'Post Not Added Successfully';
      }
      this.spinner.hide();
    });
      } else {
        this.message = 'Post Not Uploaded Successfully';
      }
    }
    );
    this.post = new Post();
  }

  get title(){
    return this.form.get('title');
  }

  get description(){
    return this.form.get('description');
  }

  get postBody(){
    return this.form.get('postBody');
  }

  get image(){
    return this.form.get('image');
  }

  url;
	msg = "";
	selectFile(event) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
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
