import { Renderer2 } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  //selector: 'app-template-preview',
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.css']
})
export class TemplatePreviewComponent implements OnInit {

  constructor(private activatedroute:ActivatedRoute,
    private postService: PostService,
    private renderer: Renderer2,
    private elementRef: ElementRef) { 

  }
  id;
  retriviedTemplate: any;
  ngOnInit() {
   this.id =this.activatedroute.snapshot.paramMap.get("html");
  this.getTemplateDetails(this.id);
  }

  getTemplateDetails(id) {
    this.postService.getTemplateDetails(id)
       .subscribe(
         res => {
          this.retriviedTemplate = res;
          console.log(this.retriviedTemplate);
          this.elementRef.nativeElement.innerHTML = this.retriviedTemplate.tempStructure;
         // this.renderer.setProperty(this.html.nativeElement, 'innerHTML', this.retriviedTemplate);
         }
       );
   }

}
