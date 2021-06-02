import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ArticleTags, ScullyService } from '../../shared/scully.service';

/**
 * Convert string to ArticleTag
 *
 * @param value - The value to check
 * @returns True if it is an ArticleTag
 */
export function typeGuardArticleTags(value: any): value is ArticleTags {
  return Object.values(ArticleTags).includes(value);
}

/**
 * Return the value from the URL param for tag
 *
 * @param url - The full URL string
 * @returns The tag
 */
export function pluckTagFromUrl(url: string): string {
  return url?.split('?')[1]?.split('=')[1] ?? '';
}

@UntilDestroy()
@Component({
  selector: 'bc-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  animations: [fadeInUpOnEnterAnimation({ anchor: 'enter' })],

  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ArticlesComponent implements OnInit {
  allArticles$ = this.scullyService.visibleArticles$;
  allTags$: BehaviorSubject<readonly ArticleTags[]> =
    this.scullyService.allTags$;
  currentTag$ = new BehaviorSubject<ArticleTags | null>(null);
  navigationEnd$ = this.router.events.pipe(
    untilDestroyed(this),
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
  );

  @HostBinding('class.bc-articles') baseClass = true;

  constructor(
    private readonly metafrenzyService: MetafrenzyService,
    private route: ActivatedRoute,
    private router: Router,
    private scully: ScullyRoutesService,
    private scullyService: ScullyService,
  ) {}

  ngOnInit(): void {
    // TODO: dis be broken again
    this.navigationEnd$.pipe().subscribe((b) => {
      const tag = pluckTagFromUrl(b.url);
      if (typeGuardArticleTags(tag)) {
        this.currentTag$.next(tag);
        this.scullyService.getArticlesByTag(tag);
      } else {
        this.scullyService.clearTagFilter();
        this.currentTag$.next(null);
        this.clearFilter();
      }
    });

    this.metafrenzyService.setAllTitleTags('Articles | Benjamin Charity');
    this.metafrenzyService.setAllDescriptionTags(
      'Articles on UI, UX and Design Systems by Benjamin Charity',
    );
  }

  clearFilter(): void {
    this.router.navigate([], {
      queryParams: {
        tag: null,
      },
      queryParamsHandling: 'merge',
    });
  }
}
