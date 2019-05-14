import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { News } from "./models/news";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  baseUrl = 'http://localhost:3000/News';
  private NewsCreated = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  getNews(): Observable<News[]> {
    return this.httpClient.get<News[]>(`${this.baseUrl}`);
  }

  getNewsById(id): Observable<News> {
    return this.httpClient.get<News>(`${this.baseUrl}/${id}`);
  }

  deleteSingleNews(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  dispatchBlogpostCreated(id: string){
    this.NewsCreated.next(id);
  }

  handleBlogpostCreated(){
    return this.NewsCreated.asObservable();
  }
}
