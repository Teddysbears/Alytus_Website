import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {FormBuilder, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  imagePath: string = environment.imagePath;

  constructor(public fb: FormBuilder) { }
  sendMailForm = this.fb.group({
    name: [''],
    mail: [''],/* Regex to mail match /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/*/
    subject: [''],
    content: [''],
  });

  ngOnInit() {
  }

  sendMail() {
    console.log(this.sendMailForm.value);
  }
}
