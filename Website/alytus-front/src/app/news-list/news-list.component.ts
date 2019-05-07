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

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsList$ = this.newsService.getNews();
  }

}
