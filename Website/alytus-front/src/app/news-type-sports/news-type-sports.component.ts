import { Component, OnInit } from '@angular/core';
import {NewsService} from "../news.service";
import {environment} from "../../environments/environment";
import {News} from "../models/news";

@Component({
  selector: 'app-news-type-sports',
  templateUrl: './news-type-sports.component.html',
  styleUrls: ['./news-type-sports.component.css']
})
export class NewsTypeSportsComponent implements OnInit {

  imagePath: string = environment.imagePath;
  sportsNews: News[] = [];

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.newsService.getNews().subscribe(news => this.getAllSportsNews(news));
  }

  private getAllSportsNews(news: News[]) {
      news.forEach(value => {
        if(value.keywords[0] == 'Sports') {
          this.sportsNews.push(value);
        }
      });

  }

}
