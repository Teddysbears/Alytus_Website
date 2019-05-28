import {Component, ElementRef, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormGroup, FormGroupDirective} from "@angular/forms";
import {NewsService} from "../news.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {

  filename: String;
  imagePath: string = environment.imagePath;
  data = {
    title: "",
    writer: "",
    date: "",
    map: "",
    coordinates:{lat:"",lng:""},
    subTitles: [
      {
        sub: "",
        id: "",
      }
    ],
    contents: [
      {
        cont: "",
        id: "",
      }
    ],
    images: [
      {
        name: "",
        url: "",
        id: "",
      }
    ],
    keywords: [""],
  };

  constructor(public fb: FormBuilder, private newsService: NewsService, private el: ElementRef) {}
  createNewsForm = this.fb.group({
    title: [''],
    writer: [''],
    date: [''],
    map: ['yes'],
    coordinates: this.fb.group({
      lat: [''],
      lng: [''],
    }),
    subTitles: this.fb.array([this.fb.group({sub:[''], id:['']})]),
    contents: this.fb.array([this.fb.group({cont: [''], id: ['']})]),
    images: this.fb.array([      this.fb.group({name: [''], url: [''], id: ['']})]),
    keywords: this.fb.array(['']),
  });

  private get subtitle(){
    return this.createNewsForm.get('subTitles') as FormArray;
  }

  private get content(){
    return this.createNewsForm.get('contents') as FormArray;
  }

  private get image(){
    return this.createNewsForm.get('images') as FormArray;
  }

  private get keyword(){
    return this.createNewsForm.get('keywords') as FormArray;
  }

  protected addSubTitle() {
    this.subtitle.push(this.fb.group({sub:[''], id: ['']}));
  }

  protected addContent(){
    this.content.push(this.fb.group({cont: [''], id: ['']}));
  }

  protected addImage(){
    this.image.push(this.fb.group({name: [''], url: [''], id: ['']}));
  }

  protected  addKeyword(){
    this.keyword.push(this.fb.control(['']));
  }

  deleteAny(control, index) {
    control.removeAt(index)
  }

  changeImage(control,index) {
    control.at(index).patchValue({url:this.filename});
    console.log(this.filename);
    this.filename ="";
    console.log(this.filename);
  }

  upload(control, index){
    //retrieve file upload HTML tag
    let inputElement: HTMLInputElement = this.el.nativeElement.querySelector(`#image${index}`);
    let fileCount: number = inputElement.files.length;
    if(fileCount > 0) {
      let formData = new FormData();
      formData.append(`image`,inputElement.files.item(0));
      this.newsService.uploadImage(formData).subscribe(data => {
        this.filename = data.filename;
        this.changeImage(control,index);
      }, err => console.log(err));
    }
  }

  createNews(formDirective: FormGroupDirective) {
    if(this.createNewsForm.valid) {
      console.log(this.createNewsForm.value);
      this.newsService
        .createNews(this.createNewsForm.value)
        .subscribe(data => this.handleSucces(data,formDirective),err => this.handleError(err));
    }
  }

  handleSucces(data,formDirective){
    console.log('Ok blog news created',data);
    this.createNewsForm.reset();
    formDirective.resetForm();
    this.newsService.dispatchNewsCreated(data._id);
  }

  handleError(err){
    console.log('Failed to create news',err);
  }


  ngOnInit(): void {
  }

  // creationForm: FormGroup;
  //
  //
  // constructor(private fb: FormBuilder, private newsService: NewsService, private el: ElementRef) { }
  //
  // ngOnInit() {
  //   this.createForm();
  // }
  //
  // createForm() {
  //   this.creationForm = this.fb.group({
  //     title: '',
  //     writer: '',
  //     date: '',
  //     map: '',
  //     coordinates: ['',''],
  //     subTitles: ['',''],
  //     contents: ['',''],
  //     image: ['','',''],
  //     keywords: [''],
  //   });
  // }
  //
  // upload(){
  //   //retrieve file upload HTML tag
  //   let inputElement: HTMLInputElement = this.el.nativeElement.querySelector('#image');
  //   let fileCount: number = inputElement.files.length;
  //   if(fileCount > 0) {
  //     let formData = new FormData();
  //     formData.append('image',inputElement.files.item(0));
  //     this.newsService.uploadImage(formData).subscribe(data => console.log(data), err => console.log(err));
  //   }
  // }
  //
  // createNews(formDirective: FormGroupDirective) {
  //   if(this.creationForm.valid) {
  //     console.log(this.creationForm.value);
  //     this.newsService
  //       .createNews(this.creationForm.value)
  //       .subscribe(data => this.handleSucces(data,formDirective),err => this.handleError(err));
  //   }
  // }
  //
  // handleSucces(data,formDirective){
  //   console.log('Ok blog news created',data);
  //   this.creationForm.reset();
  //   formDirective.resetForm();
  //   this.newsService.dispatchNewsCreated(data._id);
  // }
  //
  // handleError(err){
  //   console.log('Failed to create news',err);
  // }

}

