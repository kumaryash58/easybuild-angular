import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-template-listing',
  templateUrl: './template-listing.component.html',
  styleUrls: ['./template-listing.component.css']
})
export class TemplateListingComponent implements OnInit {

  closeResult = '';
  constructor(public matDialog: MatDialog,
    config: NgbCarouselConfig,
    public dialogRef: MatDialogRef<TemplateListingComponent>
    ) { 
    //   config.interval = 2000;  
    // config.wrap = true;  
    // config.keyboard = false;  
    // config.pauseOnHover = false; 
    }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

//  slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// plusSlides(n) {
//   this.showSlides(this.slideIndex += n);
// }

// // Thumbnail image controls
// currentSlide(n) {
//   this.showSlides(this.slideIndex = n);
// }

// showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {this.slideIndex = 1}
//   if (n < 1) {this.slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[this.slideIndex-1]. style.display = "block";
//   :host {display: block;}
//   dots[this.slideIndex-1].className += " active";
// }

}
