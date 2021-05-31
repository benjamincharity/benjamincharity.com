import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

export enum ArticleTags {
  ANGULAR = 'angular',
  ANGULARJS = 'angularjs',
  CLI = 'cli',
  CSS = 'css',
  DESIGN = 'design',
  GIT = 'git',
  HOSTING = 'hosting',
  IOS = 'ios',
  MUSIC = 'music',
  OPTIMIZATION = 'optimization',
  OSX = 'osx',
  S3 = 's3',
  SASS = 'sass',
  SPOTIFY = 'spotify',
  TOOL = 'tool',
  UI = 'ui',
  UX = 'ux',
  VIM = 'vim',
}

export interface ArticleRoute extends ScullyRoute {
  titleTrimmed: string;
  titleTail: string;
}

/**
 * Filter ScullyRoute's to only return article pages
 */
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

/**
 * Filter ArticleRoute's by tag
 */
export function filterByTag(
  tag: ArticleTags,
): (source: Observable<ArticleRoute[]>) => Observable<ArticleRoute[]> {
  return function (source: Observable<ArticleRoute[]>) {
    return source.pipe(
      map((routes) => routes.filter((r) => r?.tags?.includes(tag))),
    );
  };
}

/**
 * Convert a standard ScullyRoute to an ArticleRoute
 */
export function convertToArticleRoutes(): (
  source: Observable<ScullyRoute[]>,
) => Observable<ArticleRoute[]> {
  return function (source: Observable<ScullyRoute[]>) {
    return source.pipe(
      map((routes) =>
        routes.map(
          (r) =>
            ({
              ...r,
              titleTrimmed: r?.title
                ?.substring(0, r.title.lastIndexOf(' '))
                .trim(),
              titleTail: r?.title
                ?.substring(r.title.lastIndexOf(' '), r.title?.length)
                .trim(),
            } as ArticleRoute),
        ),
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
  );
  visibleArticlesSource$ = new BehaviorSubject<ArticleRoute[]>([]);
  visibleArticles$ = this.visibleArticlesSource$.asObservable();

  constructor(private srs: ScullyRoutesService) {
    this.init();
  }

  /**
   * Fetch articles by tag
   *
   * @param tag - The article tag to filter by
   */
  getArticlesByTag(tag: ArticleTags) {
    this.articles$
      .pipe(filterByTag(tag))
      .pipe(take(1))
      .subscribe((v) => {
        this.visibleArticlesSource$.next(v);
      });
  }

  /**
   * Clear any existing tag filter
   */
  clearTagFilter(): void {
    this.articles$.pipe(take(1)).subscribe((v) => {
      this.visibleArticlesSource$.next(v);
    });
  }

  /**
   * Fetch initial articles
   */
  init(): void {
    this.articles$
      .pipe(take(1))
      .subscribe((v) => this.visibleArticlesSource$.next(v));
  }
}
