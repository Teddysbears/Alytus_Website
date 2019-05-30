import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {News} from "../models/news";
import {NewsService} from "../news.service";

@Component({
  selector: 'app-news-type-business',
  templateUrl: './news-type-business.component.html',
  styleUrls: ['./news-type-business.component.css']
})
export class NewsTypeBusinessComponent implements OnInit {
  imagePath: string = environment.imagePath;
  businessNews: News[] = [];

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.newsService.getNews().subscribe(news => this.getAllBusinessNews(news));
    console.log(this.businessNews);
  }

  private getAllBusinessNews(news: News[]) {
    news.forEach(value => {
      if(value.keywords[0] == 'Business') {
        this.businessNews.push(value);
      }
    });

  }
}
