import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../login/login.component';
import { PostService } from '../post.service';


@Component({
  selector: 'app-template-listing',
  templateUrl: './template-listing.component.html',
  styleUrls: ['./template-listing.component.css']
})
export class TemplateListingComponent implements OnInit {

  closeResult = '';
  retriviedTemplates: any;
  constructor(public matDialog: MatDialog,
    config: NgbCarouselConfig,
    private postService: PostService,
    public dialogRef: MatDialogRef<TemplateListingComponent>
    ) { 
    //   config.interval = 2000;  
    // config.wrap = true;  
    // config.keyboard = false;  
    // config.pauseOnHover = false; 
    }

  ngOnInit() {
    this.getAllTemplates();
  }

  closeModal() {
    this.dialogRef.close();
  }
  getAllTemplates() {
    this.postService.getAllTemplates()
       .subscribe(
         res => {
          this.retriviedTemplates = res;
          console.log(this.retriviedTemplates);
         }
       );
   }

   previewTemp(id){

   }


}
