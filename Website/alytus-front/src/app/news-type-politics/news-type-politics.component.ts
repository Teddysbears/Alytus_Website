import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {News} from "../models/news";
import {NewsService} from "../news.service";

@Component({
  selector: 'app-news-type-politics',
  templateUrl: './news-type-politics.component.html',
  styleUrls: ['./news-type-politics.component.css']
})
export class NewsTypePoliticsComponent implements OnInit {
  imagePath: string = environment.imagePath;
  politicsNews: News[] = [];

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.newsService.getNews().subscribe(news => this.getAllPoliticsNews(news));
  }

  private getAllPoliticsNews(news: News[]) {
    news.forEach(value => {
      if(value.keywords[0] == 'Politics') {
        this.politicsNews.push(value);
      }
    });

  }

}
