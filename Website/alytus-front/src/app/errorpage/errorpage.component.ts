import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../environments/environment";
declare let $: any;

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent implements OnInit {


  imagePath = environment.imagePath;

  constructor() { }

  ngOnInit() {
  }
}
