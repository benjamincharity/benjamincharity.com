import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, Data } from '@angular/router';

import { ArticleComponent } from './blog/article/article.component';
import { ArticlesComponent } from './blog/articles/articles.component';
import { HomeComponent } from './home/home.component';

export enum BcPageNames {
  HOME = 'home',
  ARTICLES = 'articles',
  ARTICLE = 'article',
}

export interface BcRouteData {
  animation: BcPageNames;
}

export interface BcRoute extends Route {
  data: BcRouteData;
}

export const coerceRouteData = (data: Data): data is BcRouteData =>
  data.animation != undefined;

const routes: BcRoute[] = [
  {
    path: 'articles/:postId',
    component: ArticleComponent,
    data: { animation: BcPageNames.ARTICLE },
  },
  {
    path: 'articles',
    component: ArticlesComponent,
    data: { animation: BcPageNames.ARTICLES },
  },
  { path: '', component: HomeComponent, data: { animation: BcPageNames.HOME } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
