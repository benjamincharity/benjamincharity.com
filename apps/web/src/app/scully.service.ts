import { Injectable } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export enum ArticleTags {
  AMAZON = 'amazon',
  S3 = 's3',
  HOSTING = 'hosting',
}

export interface BlogRoute extends ScullyRoute {
  titleTrimmed: string;
  titleTail: string;
}

@Injectable({ providedIn: 'root' })
export class ScullyService {
  articles$ = this.srs.available$.pipe(
    map((scullyRoutes: ScullyRoute[]) => {
      return scullyRoutes.filter(
        (r) => r.route.startsWith('/blog/') && r.sourceFile?.endsWith('.md')
      );
    }),
    map((scullyRoutes: ScullyRoute[]) => {
      return scullyRoutes.map((r) => {
        return {
          ...r,
          titleTrimmed: r?.title?.substring(0, r.title.lastIndexOf(' ')).trim(),
          titleTail: r?.title
            ?.substring(r.title.lastIndexOf(' '), r.title?.length)
            .trim(),
        } as BlogRoute;
      });
    }),
    tap((b) => console.log(b))
  );

  amazonPosts$ = this.srs.available$.pipe(
    map((routeList: ScullyRoute[]) =>
      routeList.filter((route: ScullyRoute) => {
        return route?.tags?.includes(ArticleTags.AMAZON);
      })
    ),
    map((articles) => articles.sort((a, b) => (a.date < b.date ? 1 : -1)))
  );

  s3Posts$ = this.srs.available$.pipe(
    map((routeList: ScullyRoute[]) =>
      routeList.filter((route: ScullyRoute) => {
        return route?.tags?.includes(ArticleTags.S3);
      })
    ),
    map((articles) => articles.sort((a, b) => (a.date < b.date ? 1 : -1)))
  );

  allTags$ = new BehaviorSubject<ReadonlyArray<ArticleTags>>(
    Object.values(ArticleTags)
  );

  constructor(private srs: ScullyRoutesService) {}
}
