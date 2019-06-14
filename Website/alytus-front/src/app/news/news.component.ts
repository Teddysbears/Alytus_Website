import { Component, OnInit } from '@angular/core';
import { News } from "../models/news";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {NewsService} from "../news.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
  /*encapsulation: ViewEncapsulation.None*/
})
export class NewsComponent implements OnInit {
  news$: Observable<News>;
  arrayTemplate: Array<string> = [];
  title: string;
  time: string;
  writer: string;
  keywords: Array<string> = [];
  private static imagePath: string = environment.imagePath;
  imagePath: string = environment.imagePath;

  constructor(private activatedRoute: ActivatedRoute ,private newsService: NewsService, private router: Router) { }

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
    this.title = news.title;
    this.time = news.date;
    this.writer= news.writer;
    this.keywords = news.keywords;
    this.arrayTemplate[0] = "";
    this.arrayTemplate.length = news.subTitles.length + news.contents.length + news.images.length;
    let idx;
    for (idx = 0; idx<news.images.length; idx++) {
      let index = news.images[idx].id;
      this.arrayTemplate[index] = NewsComponent.imgCreatorBeacon(news.images[idx]);
    }
    for (idx = 0; idx<news.contents.length; idx++) {
      let index = news.contents[idx].id;
      this.arrayTemplate[index] = NewsComponent.contentCreatorBeacon(news.contents[idx]);
    }
    for (idx = 0; idx<news.subTitles.length; idx ++) {
      let index = news.subTitles[idx].id;
      this.arrayTemplate[index] = NewsComponent.subTitleCreatorBeacon(news.subTitles[idx]);
    }
  }

  //Create img beacon for all image of a news
  private static imgCreatorBeacon(imageElement: { name: string; url: string; id: number }) {
  return `<hr><div class="news-image"> <img class="img-fluid" src="${this.imagePath +imageElement.url}" alt=${imageElement.name}></div>`;
  }

  /* Create contents beacon for all contents of a news
   */
  private static contentCreatorBeacon(contentElement: { cont: string; id: number }) {
    return `<div class="news-content"> <p>${contentElement.cont}</p> </div>`;
  }

  /* Create subTitles beacon for all subTitles of a news
   */
  private static subTitleCreatorBeacon(subTitleElement: { sub: string; id: number }) {
    return `<p>${subTitleElement.sub}</p>`;
  }

  search(keyword: string) {
    this.router.navigate(['../../news/search',keyword])
  }
}
