import { Injectable, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

export enum ArticleTags {
  AMAZON = 'amazon',
  ANGULAR = 'angular',
  ANGULARJS = 'angularjs',
  CLI = 'cli',
  CSS = 'css',
  DESIGN = 'design',
  GIT = 'git',
  GZIP = 'gzip',
  HOSTING = 'hosting',
  IOS = 'ios',
  MUSIC = 'music',
  OPTIMIZATION = 'optimization',
  OSX = 'osx',
  S3 = 's3',
  SASS = 'sass',
  SIMULATOR = 'simulator',
  SPOTIFY = 'spotify',
  TOOL = 'tool',
  UI = 'ui',
  UX = 'ux',
  VIM = 'vim',
  WRITING = 'writing',
}

export interface ArticleRoute extends ScullyRoute {
  titleTrimmed: string;
  titleTail: string;
}

export function onlyArticleRoutes(): (
  source: Observable<ScullyRoute[]>,
) => Observable<ScullyRoute[]> {
  return function (source: Observable<ScullyRoute[]>) {
    return source.pipe(
      map((routes) =>
        routes.filter(
          (r) =>
            r.route.startsWith('/articles/') && r.sourceFile?.endsWith('.md'),
        ),
      ),
    );
  };
}

export function filterByTag(
  tag: ArticleTags,
): (source: Observable<ArticleRoute[]>) => Observable<ArticleRoute[]> {
  return function (source: Observable<ArticleRoute[]>) {
    return source.pipe(
      map((routes) => routes.filter((r) => r?.tags?.includes(tag))),
    );
  };
}

export function convertToArticleRoutes(): (
  source: Observable<ScullyRoute[]>,
) => Observable<ArticleRoute[]> {
  return function (source: Observable<ScullyRoute[]>) {
    return source.pipe(
      tap((r) => console.log(r)),
      map((routes) =>
        routes.map((r) => {
          return {
            ...r,
            titleTrimmed: r?.title
              ?.substring(0, r.title.lastIndexOf(' '))
              .trim(),
            titleTail: r?.title
              ?.substring(r.title.lastIndexOf(' '), r.title?.length)
              .trim(),
          } as ArticleRoute;
        }),
      ),
    );
  };
}

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class ScullyService {
  allTags$ = new BehaviorSubject<ReadonlyArray<ArticleTags>>(
    Object.values(ArticleTags),
  );
  articles$ = this.srs.available$.pipe(
    untilDestroyed(this),
    onlyArticleRoutes(),
    convertToArticleRoutes(),
    // tap((b) => console.log('articles$: ', b))
  );

  visibleArticlesSource$ = new BehaviorSubject<ArticleRoute[]>([]);
  visibleArticles$ = this.visibleArticlesSource$.asObservable();

  // articlesByTag$ = this.articles$.pipe(filterByTag())

  getArticlesByTag(tag: ArticleTags) {
    // console.log('getting by tag: ', tag);
    this.articles$
      .pipe(filterByTag(tag))
      .pipe(take(1))
      .subscribe((v) => {
        this.visibleArticlesSource$.next(v);
      });
  }

  clearTagFilter(): void {
    this.articles$.pipe(take(1)).subscribe((v) => {
      this.visibleArticlesSource$.next(v);
    });
  }

  // amazonPosts$ = this.articles$.pipe(
  //   map((routeList: ScullyRoute[]) =>
  //     routeList.filter((route: ScullyRoute) => {
  //       return route?.tags?.includes(ArticleTags.AMAZON);
  //     })
  //   ),
  //   map((articles) => articles.sort((a, b) => (a.date < b.date ? 1 : -1)))
  // );
  //
  // s3Posts$ = this.srs.available$.pipe(
  //   map((routeList: ScullyRoute[]) =>
  //     routeList.filter((route: ScullyRoute) => {
  //       return route?.tags?.includes(ArticleTags.S3);
  //     })
  //   ),
  //   map((articles) => articles.sort((a, b) => (a.date < b.date ? 1 : -1)))
  // );

  constructor(private srs: ScullyRoutesService) {
    this.init();
  }

  init(): void {
    console.log('fetching original articles');
    this.articles$
      .pipe(take(1))
      .subscribe((v) => this.visibleArticlesSource$.next(v));
  }
}
