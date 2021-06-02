import { NgModule } from '@angular/core';
import { RouterModule, Route, Data } from '@angular/router';

import { ArticleComponent } from './blog/article/article.component';
import { ArticlesComponent } from './blog/articles/articles.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export enum BcPageNames {
  HOME = 'home',
  ARTICLES = 'articles',
  ARTICLE = 'article',
  NOT_FOUND = 'notFound',
}

export interface BcRouteData {
  animation: BcPageNames;
  metafrenzy?: Record<string, unknown>;
}

export interface BcRoute extends Route {
  data?: BcRouteData;
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
  {
    path: '',
    component: HomeComponent,
    data: { animation: BcPageNames.HOME },
  },
  {
    path: '404',
    component: NotFoundComponent,
    data: { animation: BcPageNames.NOT_FOUND },
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
