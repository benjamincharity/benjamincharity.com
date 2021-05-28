import { AfterViewChecked, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { combineLatest } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

import { HighlightService } from '../../highlight.service';

@Component({
  selector: 'bc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements AfterViewChecked {
  articleMetadata$ = combineLatest([
    this.activatedRoute.params.pipe(pluck('postId')),
    this.scully.available$,
  ]).pipe(
    tap((r) => console.log('meta post:', r)),
    map(([postId, routes]) =>
      routes.find((route) => route.route === `/articles/${postId}`),
    ),
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private scully: ScullyRoutesService,
    private highlightService: HighlightService,
  ) {}

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
}
