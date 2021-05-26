import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, Data } from '@angular/router';

import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';

export enum BcPageNames {
  HOME = 'home',
  BLOG = 'blog',
  BLOG_ARTICLE = 'blogArticle',
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
    path: 'blog/:postId',
    component: BlogPostComponent,
    data: { animation: BcPageNames.BLOG_ARTICLE },
  },
  {
    path: 'blog',
    component: BlogComponent,
    data: { animation: BcPageNames.BLOG },
  },
  { path: '', component: HomeComponent, data: { animation: BcPageNames.HOME } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
