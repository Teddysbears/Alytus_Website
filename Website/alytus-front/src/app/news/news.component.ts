import { Component, OnInit } from '@angular/core';
import { News } from "../models/news";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ActivatedRoute } from "@angular/router";
import {NewsService} from "../news.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news$: Observable<News>;
  imagePath = environment.imagePath;

  constructor(private activatedRoute: ActivatedRoute ,private newsService: NewsService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.news$ = this.newsService.getNewsById(id);
  }

}
