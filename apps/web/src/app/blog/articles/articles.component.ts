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
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { ArticleTags, ScullyService } from '../../shared/scully.service';

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
  currentTag$: Observable<ArticleTags> = this.route.queryParams.pipe(
    untilDestroyed(this),
    filter((qps) => qps.tag),
    map((qp) => qp.tag),
  );

  @HostBinding('class.bc-articles') baseClass = true;

  constructor(
    private scully: ScullyRoutesService,
    private scullyService: ScullyService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const navEnd$ = this.router.events.pipe(
      untilDestroyed(this),
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    );

    combineLatest([navEnd$, this.route.queryParams])
      .pipe(
        untilDestroyed(this),
        switchMap(([_, b]) => of(b)),
      )
      .subscribe((v) => {
        if (v?.tag) {
          this.scullyService.getArticlesByTag(v.tag);
        } else {
          this.scullyService.clearTagFilter();
        }
      });
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
