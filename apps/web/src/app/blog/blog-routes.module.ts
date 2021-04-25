import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:postId', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
