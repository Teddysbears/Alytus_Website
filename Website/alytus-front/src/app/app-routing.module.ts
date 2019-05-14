import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { NewsComponent } from "./news/news.component";
import { NewsListComponent } from "./news-list/news-list.component";
import {TourismPageComponent} from "./tourism-page/tourism-page.component";
import {ForumsPageComponent} from "./forums-page/forums-page.component";
import {AboutUsPageComponent} from "./about-us-page/about-us-page.component";
import {SignInPageComponent} from "./sign-in-page/sign-in-page.component";
import {ErrorpageComponent} from "./errorpage/errorpage.component";
import {AdminComponent} from "./admin/admin.component";
import {AdminnewsComponent} from "./adminnews/adminnews.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Account', component: SignInPageComponent},
  { path: 'News/:id', component: NewsComponent },
  { path: 'News', component: NewsListComponent},
  { path: 'Tourism', component: TourismPageComponent},
  { path: 'Forums', component: ForumsPageComponent},
  { path: 'AboutUs', component: AboutUsPageComponent},
  { path: 'Admin', component: AdminComponent},
  { path: 'Admin/News/:id', component: AdminnewsComponent},
  { path: '**', component: ErrorpageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
