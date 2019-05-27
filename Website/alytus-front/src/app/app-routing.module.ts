import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { NewsComponent } from "./news/news.component";
import { NewsListComponent } from "./news-list/news-list.component";
import {TourismPageComponent} from "./tourism-page/tourism-page.component";
import {SignInPageComponent} from "./sign-in-page/sign-in-page.component";
import {ErrorpageComponent} from "./errorpage/errorpage.component";
import {AdminComponent} from "./admin/admin.component";
import {NewsListAdminComponent} from "./news-list-admin/news-list-admin.component";
import {NewsCreateComponent} from "./news-create/news-create.component";
import {NewsEditComponent} from "./news-edit/news-edit.component";
import {AboutUsComponent} from "./about-us/about-us.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: SignInPageComponent},
  { path: 'news/:id', component: NewsComponent },
  { path: 'news', component: NewsListComponent},
  { path: 'tourism', component: TourismPageComponent},
  { path: 'aboutUs', component: AboutUsComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'admin/news', component: NewsListAdminComponent},
  { path: 'admin/news/create', component: NewsCreateComponent},
  { path: 'admin/news/:id', component: NewsEditComponent},
  { path: '**', component: ErrorpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
