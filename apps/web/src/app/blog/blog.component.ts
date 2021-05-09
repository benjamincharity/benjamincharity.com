import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ArticleTags, ScullyService } from '../scully.service';

// export interface BcBlogRoute extends ScullyRoute {
//   tags?: string[];
//   publishDate?: string;
// }

@Component({
  selector: 'bc-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  allArticles$ = this.scullyService.articles$;
  // amazonArticles$ = this.scullyService.amazonPosts$;
  allTags$ = this.scullyService.allTags$;
  currentTag$: Observable<ArticleTags> = this.route.queryParams.pipe(
    filter((qps) => qps.tag),
    map((qp) => qp.tag)
  );

  constructor(
    private scully: ScullyRoutesService,
    private scullyService: ScullyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.route.queryParams.pipe(filter((qp) => qp.tag)).subscribe((params) => {
    //   console.log(params); // { order: "popular" }
    // });
  }
}
