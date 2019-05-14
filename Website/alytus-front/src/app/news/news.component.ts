import { Component, OnInit } from '@angular/core';
import { News } from "../models/news";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ActivatedRoute } from "@angular/router";
import {NewsService} from "../news.service";
//import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
  /*encapsulation: ViewEncapsulation.None*/
})
export class NewsComponent implements OnInit {
  news$: Observable<News>;
  imagePath = environment.imagePath;
  arrayTemplate: Array<string> = [];
  title: string;
  time: string;
  writer: string;
  keywords: Array<string> = [];

  constructor(private activatedRoute: ActivatedRoute ,private newsService: NewsService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.news$ = this.newsService.getNewsById(id);
    this.allTemplatefilled();
  }

  allTemplatefilled() {
    this.news$.forEach(x => this.fillTemplate(x));
  }

  /*Don"t forgot to delete all this.arrayTemplate[n] ="" because example are false
  * Fill arrayTemplate with all news infos beacon.
  * */
  fillTemplate(news: News) {
    console.log(news);
    this.title = news.title;
    this.time = news.date;
    this.writer= news.writer;
    this.keywords = news.keywords;
    this.arrayTemplate[0] = "";
    this.arrayTemplate.length = news.subTitle.length + news.content.length + news.image.length;
    let idx;
    for (idx = 0; idx<news.image.length; idx++) {
      let index = news.image[idx].id;
      console.log(index);
      this.arrayTemplate[index] = NewsComponent.imgCreatorBeacon(news.image[idx]);
    }
    for (idx = 0; idx<news.content.length; idx++) {
      let index = news.content[idx].id;
      this.arrayTemplate[index] = NewsComponent.contentCreatorBeacon(news.content[idx]);
    }
    for (idx = 0; idx<news.subTitle.length; idx ++) {
      let index = news.subTitle[idx].id;
      this.arrayTemplate[index] = NewsComponent.subTitleCreatorBeacon(news.subTitle[idx]);
    }
    this.arrayTemplate[4] = "";
    this.arrayTemplate[7] = "";
    console.log(this.arrayTemplate);
  }

  //Create img beacon for all image of a news
  private static imgCreatorBeacon(imageElement: { name: string; url: string; id: number }) {
    /*tmp because we didn't upload images on our server*/
  return `<hr><div class="news-image"> <img class="img-fluid" src="${/*this.imagePath +*/imageElement.url}" alt=${imageElement.name}></div>`;
  }

  /* Create content beacon for all content of a news
   */
  private static contentCreatorBeacon(contentElement: { cont: string; id: number }) {
    return `<div class="news-content"> <p>${contentElement.cont}</p> </div>`;
  }

  /* Create subTitle beacon for all subTitle of a news
   */
  private static subTitleCreatorBeacon(subTitleElement: { sub: string; id: number }) {
    return `<p>${subTitleElement.sub}</p>`;
  }
}
