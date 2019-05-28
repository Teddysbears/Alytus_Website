import { Component, OnInit } from '@angular/core';
import { News } from "../models/news";
import { Observable } from "rxjs";
import { NewsService } from "../news.service";
import { environment } from "../../environments/environment";


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  newsList$: Observable<News[]>;
  imagePath = environment.imagePath;
  politicsNews: News = null;
  buildingsNews: News = null;
  sportsNews: News = null;
  businessNews: News = null;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsList$ = this.newsService.getNews();
    this.newsList$.subscribe(news => this.newsTypeCreator(news))
  }

  private newsTypeCreator(news: News[]) {
    let activeNews: News;
    news.forEach( data => {
      activeNews = data;
      if(activeNews.keywords[0] == 'Politics' && this.politicsNews == null) {
        this.politicsNews = activeNews;
      }
      if(activeNews.keywords[0] == 'Buildings' && this.buildingsNews == null) {
        this.buildingsNews = activeNews;
      }
      if(activeNews.keywords[0] == 'Sports' && this.sportsNews == null) {
        this.sportsNews = activeNews;
      }
      if(activeNews.keywords[0] == 'Business' && this.businessNews == null) {
        this.businessNews = activeNews;
      }
    });
  }

}
