import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { Template } from '../template';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {

  constructor(private postService: PostService,
    private router: Router) { }

  ngOnInit() {
  }

  template : Template=new Template();
  submitted = false;
  mimeType : File;
  message: string;
  loading = false;

  form=new FormGroup({
    tempName:new FormControl(),
    tempStructure:new FormControl()
  });
  isSave = false;
  onSubmit(registerform): void {
    if(registerform==="Save") {  
      this.loading = true;
    this.template=new Template();
    this.template.tempName=this.tempName.value;
    this.template.tempStructure=this.tempStructure.value;
    this.submitted=true;
    
    this.savePost();
    }

}

  savePost() {
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData(); 
    uploadImageData.append('imageFile', this.mimeType, this.mimeType.name);
    uploadImageData.append('tempName', this.tempName.value);
    uploadImageData.append('tempStructure', this.tempStructure.value);
    console.log(this.mimeType);
     //Upload Image
    this.postService.createTemplate(uploadImageData)
    .subscribe((response) => {
      if (response) {
        this.message = 'Template Added Successfully';
        this.loading = false;
        this.router.navigate(['/add-item'])
      } else {
        this.message = 'Template Not Added Successfully';
        this.loading = false;
      }
    });
    this.template = new Template();
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

  get tempName(){
    return this.form.get('tempName');
  }

  get tempStructure(){
    return this.form.get('tempStructure');
  }

}
