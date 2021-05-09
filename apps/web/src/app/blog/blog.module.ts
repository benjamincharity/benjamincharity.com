import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { TagLinksComponent } from './tag-links/tag-links.component';

@NgModule({
  declarations: [BlogComponent, BlogPostComponent, TagLinksComponent],
  imports: [CommonModule, BlogRoutingModule, ScullyLibModule],
})
export class BlogModule {}
