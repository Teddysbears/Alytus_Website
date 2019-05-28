import {Component, ElementRef, OnInit} from '@angular/core';
import {News} from "../models/news";
import {NewsService} from "../news.service";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {environment} from "../../environments/environment";
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {

  newsId: string;
  news: News;
  filename: string;
  imagePath: string = environment.imagePath;

  constructor(private newsService: NewsService, private el: ElementRef, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.newsId = this.activeRoute.snapshot.paramMap.get('id');
    this.newsService.getNewsById(this.newsId)
      .subscribe(data => {this.news = data;},
        err => console.log(err));
  }

  changeImage(index) {
    this.news.images[index].url =  this.filename;
    this.filename ="";
  }

  upload(index){
    //retrieve file upload HTML tag
    let inputElement: HTMLInputElement = this.el.nativeElement.querySelector(`#image${index}`);
    let fileCount: number = inputElement.files.length;
    if(fileCount > 0) {
      let formData = new FormData();
      formData.append(`image`,inputElement.files.item(0));
      this.newsService.uploadImage(formData).subscribe(data => {
        this.filename = data.filename;
        this.changeImage(index);
      }, err => console.log(err));
    }
  }

  updateNews(formDirective: NgForm) {
    const editedNews = this.news;
    this.newsService
      .updateNews(this.newsId, editedNews)
      .subscribe(data => this.handleSucces(data, formDirective), error1 => this.handleError(error1));
    this.router.navigate(['../../news', this.news._id]);
  }

  handleSucces(data, formDirective) {
    console.log('Ok handle success - news updated', data);
    formDirective.reset();
    formDirective.resetForm();
    this.newsService.dispatchNewsCreated(data._id);
  }

  handleError(error) {
    console.log('KO handle error - news update failed',error);
  }

}
