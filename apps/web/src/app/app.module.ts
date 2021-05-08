import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { HomeComponent } from './home/home.component';
import { KeyboardArrowsComponent } from './keyboard-arrows/keyboard-arrows.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    HomeComponent,
    KeyboardArrowsComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, CommonModule, ScullyLibModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
