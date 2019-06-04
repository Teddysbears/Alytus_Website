import { Component, OnInit } from '@angular/core';
import {MapMouseEvent, Map} from "mapbox-gl";
import {environment} from "../../environments/environment";
import {News} from "../models/news";
import {NewsService} from "../news.service";
import {Observable} from "rxjs";
import { Router } from '@angular/router';



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
  coordinatesArray: GeometryType[] = [new GeometryClass()];
  allNewsMap: News[] = [];
  geojsonGenerator: GeojsonGeneratorClass = new GeojsonGeneratorClass();



  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit() {
    this.allNews = this.newsService
      .getNews();
    this.coordinatesArray = this.fillCoordinatesArray();
    this.geojsonGenerator.features = [];
    console.log(this.allNewsMap);
    console.log(this.geojsonGenerator);
  }

  private fillCoordinatesArray() {
    let coordinates: GeometryType[] = [new GeometryClass()];
    this.allNews.forEach(value => {
      value.forEach((news, index) => {
        if (news.map) {
          coordinates[index] = this.fillOneCoordinates(news.coordinates);
          this.allNewsMap.push(news);
        }
      });
      this.fillGeojson();
    }).catch(err => console.log(err));
    return coordinates;
  }


  private fillOneCoordinates(coordinates: [{ lat: number; lng: number }]) {
    let coordinatesNews: GeometryType= new GeometryClass();
    coordinates.forEach(value => {coordinatesNews.coordinates=[value.lat, value.lng]});
    coordinatesNews.type = 'Point';
    return coordinatesNews;
  }

  centerMapTo(evt: MapMouseEvent) {
    this.center = (<any>evt).features[0].geometry.coordinates;
  }

  private fillGeojson() {
    this.allNewsMap.forEach(news => {
      let features: FeaturesClass = new FeaturesClass();
      features.properties = this.fillOneProperties(news);
      features.geometry = this.fillOneCoordinates(news.coordinates);
      features.type = 'Feature';
      this.geojsonGenerator.features.push(features);
    });
    this.geojsonGenerator.type = 'FeatureCollection';
  }

  private fillOneProperties(news: News) {
    let propertiesNews: PropertiesClass = new PropertiesClass();
    propertiesNews.iconSize = [50, 50];
    propertiesNews.redirection = news._id;
    propertiesNews.image = `url(http://localhost:3000/${news.images[0].url})`;
    return propertiesNews;
  }

  redirectToNew(redirection: string) {
    this.router.navigate(['../../news', redirection]);
  }
}
interface GeometryType {
  coordinates: number[];
  type: string;
}

interface PropertiesType {
  redirection: string;
  iconSize: number[];
  image: string;
}

interface FeaturesType {
  type: string;
  properties: PropertiesClass;
  geometry: GeometryClass;
}

interface GeojsonGeneratorType {
  type: string;
  features: FeaturesClass[];
}

class GeojsonGeneratorClass implements GeojsonGeneratorType {
  type: string;
  features: FeaturesClass[];
}

class FeaturesClass implements FeaturesType {
  type: string;
  properties: PropertiesClass;
  geometry: GeometryClass;
}

class PropertiesClass implements PropertiesType {
  redirection: string;
  iconSize: number[];
  image: string;
}

class GeometryClass implements GeometryType{
  coordinates: number[];
  type: string;
}
