import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { AppComponent } from './app.component';
import { BlogModule } from './blog/blog.module';
import { CanvasComponent } from './canvas/canvas.component';

export const ROUTES: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: '**',
    redirectTo: 'home',
    // pathMatch: 'full',
  },
  // { path: '**', component: HomeComponent },
];

@NgModule({
  declarations: [AppComponent, CanvasComponent],
  imports: [
    BlogModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    RouterModule.forRoot(ROUTES),
    ScullyLibModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
