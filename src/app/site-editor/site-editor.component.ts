import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-editor',
  templateUrl: './site-editor.component.html',
  styleUrls: ['./site-editor.component.css']
})
export class SiteEditorComponent implements OnInit {

  constructor(private elem: ElementRef) { }

  ngOnInit() {
  }

  addButton(){
    let elements = this.elem.nativeElement.querySelectorAll('.slideSecClass');
   
    // const class = document.getElementsByClassName('')
  }

}
