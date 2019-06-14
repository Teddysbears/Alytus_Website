import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {News} from "../models/news";
import {NewsService} from "../news.service";

@Component({
  selector: 'app-news-type-buildings',
  templateUrl: './news-type-buildings.component.html',
  styleUrls: ['./news-type-buildings.component.css']
})
export class NewsTypeBuildingsComponent implements OnInit {
  imagePath: string = environment.imagePath;
  buildingsNews: News[] = [];

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.newsService.getNews().subscribe(news => this.getAllBuildingsNews(news));
  }

  private getAllBuildingsNews(news: News[]) {
    news.forEach(value => {
      if(value.keywords[0] == 'Buildings') {
        this.buildingsNews.push(value);
      }
    });

  }
}
