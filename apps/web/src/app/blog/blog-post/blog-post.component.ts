import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { combineLatest } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

@Component({
  selector: 'bc-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit {
  articleMetadata$ = combineLatest([
    this.activatedRoute.params.pipe(pluck('postId')),
    this.scully.available$,
  ]).pipe(
    tap((r) => console.log('meta post:', r)),
    map(([postId, routes]) =>
      routes.find((route) => route.route === `/blog/${postId}`)
    )
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private scully: ScullyRoutesService
  ) {}

  ngOnInit(): void {}
}
