import { Component, OnInit } from '@angular/core';
import {ApixuService} from "../apixu.service";


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  private date: Date = new Date();
  public weather: any;
  temperature: number = 0;
  sky: string = "";

  constructor(private apixuService: ApixuService) {}

  ngOnInit() {
    let dateNow: Date = new Date();
    if (this.date.getUTCDate() != dateNow.getUTCDate()) {
      console.log("date is different");
      this.date = dateNow;
      this.apixuService.getWeather().subscribe(data => this.weatherGenerator(data));
    }
    console.log(this.weather);
    console.log(this.temperature);
    console.log(this.sky);
  }

  private weatherGenerator(data: Object) {
    this.weather = data;
    this.temperature = this.weather.current.temp_c;
    console.log(this.temperature);
    this.sky = this.weather.current.condition.text;
    console.log(this.sky);
  }
}


