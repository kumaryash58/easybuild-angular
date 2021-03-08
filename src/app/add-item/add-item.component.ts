import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private postService: PostService,
    private router: Router) { }

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
  // register(registerform){
  //   // console.log(this.partnerName.value);
  //   // console.log(this.partnerEmail.value);

  //   this.post=new Post();
  //   this.post.title=this.title.value;
  //   this.post.description=this.description.value;
  //   this.post.postBody=this.postBody.value;
  //   this.post.image=this.image.value;
  //   this.submitted=true;
  //   if(this.isSave){
  //     this.savePost();
  //   }
  // }

  savePost() {
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.mimeType, this.mimeType.name);
    uploadImageData.append('description', this.description.value);
    uploadImageData.append('title', this.title.value);
    uploadImageData.append('postBody', this.postBody.value);
   uploadImageData.append('email', localStorage.getItem('email'));
    console.log(this.mimeType);
    this.postService.createPost(uploadImageData)
    .subscribe((response) => {
      if (response) {
        this.message = 'Post uploaded successfully';
        this.router.navigate(['/add-item'])
      } else {
        this.message = 'Post not uploaded successfully';
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
