import { Component, OnInit } from '@angular/core';
import {News} from "../models/news";
import {NewsService} from "../news.service";

@Component({
  selector: 'app-news-list-admin',
  templateUrl: './news-list-admin.component.html',
  styleUrls: ['./news-list-admin.component.css']
})
export class NewsListAdminComponent implements OnInit {

  allNews: News[];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService
      .getNews()
      .subscribe(data => {
        this.refresh(data);
      });

    this.newsService.handleNewsCreated().subscribe(data => {
      this.refresh(data);
    });
  }

  deleteNews(id) {
      this.newsService.deleteSingleNews(id).subscribe(data => this.refresh(data), err => this.handleError(err));
  }

  refresh(data) {
    this.newsService.getNews().subscribe(data => {
      this.allNews = data;
    })
  }

  handleError(error) {
    console.log(error);
  }
}
