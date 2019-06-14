import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = 'http://localhost:3000/sendmail';

  constructor(private htttpClient: HttpClient) { }

  sendMail(user) {
    return this.htttpClient.post<any>(`${this.baseUrl}`,user);
  }
}
