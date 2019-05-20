import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { NewsComponent } from "./news/news.component";
import { NewsListComponent } from "./news-list/news-list.component";
import {TourismPageComponent} from "./tourism-page/tourism-page.component";
import {AboutUsPageComponent} from "./about-us-page/about-us-page.component";
import {SignInPageComponent} from "./sign-in-page/sign-in-page.component";
import {ErrorpageComponent} from "./errorpage/errorpage.component";
import {AdminComponent} from "./admin/admin.component";
import {NewsListAdminComponent} from "./news-list-admin/news-list-admin.component";
import {NewsCreateComponent} from "./news-create/news-create.component";
import {NewsEditComponent} from "./news-edit/news-edit.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Account', component: SignInPageComponent},
  { path: 'News/:id', component: NewsComponent },
  { path: 'News', component: NewsListComponent},
  { path: 'Tourism', component: TourismPageComponent},
  { path: 'AboutUs', component: AboutUsPageComponent},
  { path: 'Admin', component: AdminComponent},
  { path: 'Admin/News', component: NewsListAdminComponent},
    { path: 'Admin/News/Create', component: NewsCreateComponent},
  { path: 'Admin/News/:id', component: NewsEditComponent},
  { path: '**', component: ErrorpageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
