import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { AppComponent } from './app.component';
import { BlogModule } from './blog/blog.module';
import { CanvasComponent } from './canvas/canvas.component';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';

export const ROUTES: Routes = [
  {
    path: '**',
    redirectTo: 'home',
    // pathMatch: 'full',
  },
];

@NgModule({
  declarations: [AppComponent, CanvasComponent],
  imports: [
    BlogModule,
    HomeModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    RouterModule.forRoot(ROUTES),
    ScullyLibModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
