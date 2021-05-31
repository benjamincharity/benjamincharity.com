import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './blog/article/article.component';
import { ArticlesComponent } from './blog/articles/articles.component';
import { TagLinksComponent } from './blog/tag-links/tag-links.component';
import { CanvasComponent } from './canvas/canvas.component';
import { HomeComponent } from './home/home.component';
import { CircledLinkComponent } from './shared/circled-link/circled-link.component';
import { InfoComponent } from './shared/info/info.component';
// import { FakePostComponent } from './shared/fake-post/fake-post.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    RouterModule,
    ScullyLibModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticlesComponent,
    CanvasComponent,
    CircledLinkComponent,
    // FakePostComponent,
    HomeComponent,
    TagLinksComponent,
    InfoComponent,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
