import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyContentModule } from '@scullyio/ng-lib';

import { BlogRoutingModule } from './blog-routes.module';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [BlogComponent, PostComponent, BlogComponent],
  imports: [CommonModule, BlogRoutingModule, ScullyContentModule],
})
export class BlogModule {}
