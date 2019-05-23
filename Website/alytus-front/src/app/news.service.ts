import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { News } from "./models/news";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
    baseUrl = 'http://localhost:3000/News';
  baseImgUrl = 'http://localhost:3000/server';
  private NewsCreated = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  getNews(): Observable<News[]> {
    return this.httpClient.get<News[]>(`${this.baseUrl}`);
  }

  getNewsById(id): Observable<News> {
    return this.httpClient.get<News>(`${this.baseUrl}/${id}`);
  }

  createNews(news: News){
    return this.httpClient.post<News>(this.baseUrl, news);
  }

  uploadImage(formData: FormData) {
    return this.httpClient.post<any>(`${this.baseImgUrl}/images`,formData);
  }

  deleteSingleNews(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  dispatchNewsCreated(id: string){
    this.NewsCreated.next(id);
  }

  handleNewsCreated(){
    return this.NewsCreated.asObservable();
  }

  updateNews(newsId: string, editedNews: News) {
    return this.httpClient.put(`${this.baseUrl}/${newsId}`, editedNews);
  }
}
