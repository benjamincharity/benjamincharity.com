import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import {
  fadeInUpOnEnterAnimation,
  fadeOutDownOnLeaveAnimation,
} from 'angular-animations';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { combineLatest } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

import { HighlightService } from '../../shared/highlight.service';

@Component({
  selector: 'bc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({ duration: 300, translate: '16px' }),
    fadeOutDownOnLeaveAnimation({ duration: 300, translate: '16px' }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements AfterViewChecked {
  articleMetadata$ = combineLatest([
    this.activatedRoute.params.pipe(pluck('postId')),
    this.scully.available$,
  ]).pipe(
    map(([postId, routes]) =>
      routes.find((route) => route.route === `/articles/${postId}`),
    ),
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private highlightService: HighlightService,
    private readonly metafrenzyService: MetafrenzyService,
    private scully: ScullyRoutesService,
  ) {}

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
    this.articleMetadata$.subscribe((m) => {
      if (m?.title) {
        const title = m.title;
        this.metafrenzyService.setAllTitleTags(title);
      }
      if (m?.description) {
        const description = m.description;
        this.metafrenzyService.setAllDescriptionTags(description);
      }
    });
  }
}
