import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from "./material.module";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsComponent } from './news/news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { SlimLoadingBarModule } from "ng2-slim-loading-bar";
import { HomeComponent } from './home/home.component';
import { TourismComponent } from './tourism/tourism.component';
import { YourAccountComponent } from './your-account/your-account.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForumsComponent } from './forums/forums.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TourismPageComponent } from './tourism-page/tourism-page.component';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { ForumsPageComponent } from './forums-page/forums-page.component';
import { YourAccountPageComponent } from './your-account-page/your-account-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsListComponent,
    HomeComponent,
    TourismComponent,
    YourAccountComponent,
    SignInComponent,
    ForumsComponent,
    AboutUsComponent,
    TourismPageComponent,
    AboutUsPageComponent,
    ForumsPageComponent,
    YourAccountPageComponent,
    SignInPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SlimLoadingBarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }