import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { ArticleTags, ScullyService } from '../../scully.service';

const EASING = `cubic-bezier(0.26, 0.86, 0.44, 0.985)`;

@UntilDestroy()
@Component({
  selector: 'bc-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  animations: [
    // Trigger animation cards array
    trigger('cardAnimation', [
      // Transition from any state to any state
      transition('* => *', [
        // Initially the all cards are not visible
        query(':enter', style({ opacity: 0 }), { optional: true }),

        // Each card will appear sequentially with the delay of 300ms
        query(
          ':enter',
          stagger('200ms', [
            animate(
              `300ms ${EASING}`,
              keyframes([
                style({ opacity: 0, transform: 'translateY(50px)', offset: 0 }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
              ]),
            ),
          ]),
          { optional: true },
        ),

        // Cards will disappear sequentially with the delay of 300ms
        // query(
        //   ':leave',
        //   // stagger('-60ms', [
        //   animate(
        //     `100ms ${EASING}`,
        //     keyframes([
        //       style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
        //       style({ opacity: 0, transform: 'translateY(50px)', offset: 1 }),
        //     ])
        //   ),
        //   // ]),
        //   { optional: true }
        // ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ArticlesComponent implements OnInit {
  allArticles$ = this.scullyService.visibleArticles$;
  allTags$ = this.scullyService.allTags$;
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
      tap((n) => console.log('nav end: ', n)),
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    );

    combineLatest([navEnd$, this.route.queryParams])
      .pipe(
        untilDestroyed(this),
        tap(([a, b]) => console.log(a, b)),
        switchMap(([_, b]) => of(b)),
      )
      .subscribe((v) => {
        console.log('Navigation ended, tag: ', v?.tag);
        if (v?.tag) {
          this.scullyService.getArticlesByTag(v.tag);
        } else {
          this.scullyService.clearTagFilter();
        }
      });

    // this.currentTag$.pipe(untilDestroyed(this)).subscribe((tag) => {
    //   console.log('IN CURRENT TAG pipe');
    //   if (tag) {
    //     this.scullyService.getArticlesByTag(tag);
    //   } else {
    //     this.clearFilter();
    //   }
    // });
  }

  clearFilter(): void {
    console.log('IN CLEAR');
    this.router.navigate([], {
      queryParams: {
        tag: null,
      },
      queryParamsHandling: 'merge',
    });
  }
}