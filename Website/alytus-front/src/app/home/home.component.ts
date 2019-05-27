import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {News} from "../models/news";
import {NewsService} from "../news.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imagePath = environment.imagePath;
  dateNow: Date;
  week: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  month: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  formattedDate: string;
  allNews: Observable<News[]>;
  lastNewsOf: News[]= [];
  sports: boolean;
  buildings: boolean;
  politics: boolean;
  business: boolean;
  index: number;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.sports = this.buildings = this.politics = this.business = false;
    this.index = 0;
    this.dateNow = new Date();
    this.formattedDate = this.getFormattedDate();
    console.log(this.formattedDate);
    this.allNews = this.newsService.getNews();
    this.allNews.forEach(x => x.forEach((news) => this.getLastNewsOf(news)));
    console.log(this.lastNewsOf);
  }

  getFormattedDate(){
    let dayNumber: number = this.dateNow.getUTCDate();
    let day: number = this.dateNow.getUTCDay();
    let month: number = this.dateNow.getUTCMonth();
    return `${this.week[day]}, ${dayNumber} ${this.month[month]}`;
  }

  getLastNewsOf(news: News) {
    if(this.index < 4) {
      if(news.keywords[0] == "Sports" && !this.sports) {
        this.lastNewsOf[this.index] = news;
        this.index++;
        this.sports = true;
      }
      if(news.keywords[0] == "Buildings" && !this.buildings) {
        this.lastNewsOf[this.index] = news;
        this.index++;
        this.buildings = true;
      }
      if(news.keywords[0] == "Politics" && !this.politics) {
        this.lastNewsOf[this.index] = news;
        this.index++;
        this.politics = true;
      }
      if(news.keywords[0] == "Business" && !this.business) {
        this.lastNewsOf[this.index] = news;
        this.index++;
        this.business = true;
      }
    }
  }
}
