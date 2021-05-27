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

export interface BlogRoute extends ScullyRoute {
  titleTrimmed: string;
  titleTail: string;
}

export function onlyBlogRoutes(): (
  source: Observable<ScullyRoute[]>,
) => Observable<ScullyRoute[]> {
  return function (source: Observable<ScullyRoute[]>) {
    return source.pipe(
      map((routes) =>
        routes.filter(
          (r) => r.route.startsWith('/blog/') && r.sourceFile?.endsWith('.md'),
        ),
      ),
    );
  };
}

export function filterByTag(
  tag: ArticleTags,
): (source: Observable<BlogRoute[]>) => Observable<BlogRoute[]> {
  return function (source: Observable<BlogRoute[]>) {
    return source.pipe(
      map((routes) => routes.filter((r) => r?.tags?.includes(tag))),
    );
  };
}

export function convertToBlogRoutes(): (
  source: Observable<ScullyRoute[]>,
) => Observable<BlogRoute[]> {
  return function (source: Observable<ScullyRoute[]>) {
    return source.pipe(
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
          } as BlogRoute;
        }),
      ),
    );
  };
}

// const isBlogRoutesArray = (arr: any[]): arr is Array<BlogRoute> => !!(arr[0].titleTrimmed);

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class ScullyService {
  allTags$ = new BehaviorSubject<ReadonlyArray<ArticleTags>>(
    Object.values(ArticleTags),
  );
  articles$ = this.srs.available$.pipe(
    untilDestroyed(this),
    onlyBlogRoutes(),
    convertToBlogRoutes(),
    // tap((b) => console.log('articles$: ', b))
  );

  visibleArticlesSource$ = new BehaviorSubject<BlogRoute[]>([]);
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
