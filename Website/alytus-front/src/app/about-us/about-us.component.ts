import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {FormBuilder} from "@angular/forms";
import {ContactService} from "../contact.service";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  imagePath: string = environment.imagePath;

  constructor(public fb: FormBuilder, private contactService: ContactService) { }
  sendMailForm = this.fb.group({
    name: [''],
    email: [''],/* Regex to email match /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/*/
    subject: [''],
    content: [''],
  });

  ngOnInit() {
  }

  sendMail() {
    console.log(this.sendMailForm.value);
    let user = {
      email:  this.sendMailForm.get('email').value,
      subject: this.sendMailForm.get('subject').value,
      content: this.sendMailForm.get('content').value,
    };
    this.contactService.sendMail(user);
  }
}
