import { Component, OnInit } from '@angular/core';
import {MapMouseEvent, Map} from "mapbox-gl";
import {environment} from "../../environments/environment";
import {News} from "../models/news";
import {NewsService} from "../news.service";
import {Observable} from "rxjs";



@Component({
  selector: 'app-mapboxmodifier',
  templateUrl: './mapboxmodifier.component.html',
  styleUrls: ['./mapboxmodifier.component.css']
})
export class MapboxmodifierComponent implements OnInit {

  imagePath = environment.imagePath;
  map: Map;
  cursorStyle: string;

  center = [24.05474,54.40135];
  iconImage = this.imagePath + "9055574091e6c25bc388cc6cfb7dd8e7.png";
  zoom = 12;
  allNews: Observable<News[]>;
  coordinatesArray: CoordinatesType[] = [new CoordinatesClass()];


  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.allNews = this.newsService
      .getNews();
    this.coordinatesArray = this.fillCoordinatesArray();
  }

  private fillCoordinatesArray() {
    let coordinates: CoordinatesType[] = [new CoordinatesClass()];
    this.allNews.forEach(value => {
      value.forEach((news, index) => {
        if(news.map)
          coordinates[index] = this.fillOne(news.coordinates)});
    });
    return coordinates;
  }


  private fillOne(coordinates: [{ lat: number; lng: number }]) {
    let coordinatesNews: CoordinatesType= new CoordinatesClass();
    coordinates.forEach(value => {coordinatesNews.coordinates=[value.lat, value.lng]});
    coordinatesNews.type = 'Point';
    return coordinatesNews;
  }

  centerMapTo(evt: MapMouseEvent) {
    this.center = (<any>evt).features[0].geometry.coordinates;
  }

}
interface CoordinatesType {
  coordinates: number[];
  type: string;
}

class CoordinatesClass implements CoordinatesType{
  coordinates: number[];
  type: string;

  CoordinatesClass(){
    this.coordinates = [0,0];
    this.type='Point';
  }

}
