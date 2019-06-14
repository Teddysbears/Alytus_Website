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
import { AboutUsComponent } from './about-us/about-us.component';
import { TourismPageComponent } from './tourism-page/tourism-page.component';
import { YourAccountPageComponent } from './your-account-page/your-account-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapboxmodifierComponent } from './mapboxmodifier/mapboxmodifier.component';
import { NewsnavbarComponent } from './newsnavbar/newsnavbar.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AdminComponent } from './admin/admin.component';
import { NewsListAdminComponent } from './news-list-admin/news-list-admin.component';
import { NewsCreateComponent } from './news-create/news-create.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NewsEditComponent } from './news-edit/news-edit.component';
import { NgxEditorModule} from "ngx-editor";
import { WeatherComponent } from './weather/weather.component';
import { NewsTypeBuildingsComponent } from './news-type-buildings/news-type-buildings.component';
import { NewsTypeSportsComponent } from './news-type-sports/news-type-sports.component';
import { NewsTypeBusinessComponent } from './news-type-business/news-type-business.component';
import { NewsTypePoliticsComponent } from './news-type-politics/news-type-politics.component';
import { NewsSearchKeywordComponent } from './news-search-keyword/news-search-keyword.component';


@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsListComponent,
    HomeComponent,
    TourismComponent,
    YourAccountComponent,
    SignInComponent,
    AboutUsComponent,
    TourismPageComponent,
    YourAccountPageComponent,
    SignInPageComponent,
    MapboxmodifierComponent,
    NewsnavbarComponent,
    ErrorpageComponent,
    AdminComponent,
    NewsListAdminComponent,
    NewsCreateComponent,
    NewsEditComponent,
    WeatherComponent,
    NewsTypeBuildingsComponent,
    NewsTypeSportsComponent,
    NewsTypeBusinessComponent,
    NewsTypePoliticsComponent,
    NewsSearchKeywordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SlimLoadingBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxEditorModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiZWxlbjIiLCJhIjoiY2p2Nms2Y2JzMDBxZjRmcGZvdTllOXF0eiJ9.IMiGn8FUOUT4sj0vmb1Myw'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
