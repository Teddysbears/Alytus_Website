import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private httpClient: HttpClient) {}


  getWeather() {
    return this.httpClient.get(
      'https://api.apixu.com/v1/current.json?key=6e5377d552084de0a09120616192705&q=Alytus'
    );
  }
}
