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
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ArticleTags, ScullyService } from '../scully.service';

// export interface BcBlogRoute extends ScullyRoute {
//   tags?: string[];
//   publishDate?: string;
// }

const EASING = `cubic-bezier(0.26, 0.86, 0.44, 0.985)`;
@Component({
  selector: 'bc-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
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
              ])
            ),
          ]),
          { optional: true }
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
export class BlogComponent {
  allArticles$ = this.scullyService.articles$;
  // amazonArticles$ = this.scullyService.amazonPosts$;
  allTags$ = this.scullyService.allTags$;
  currentTag$: Observable<ArticleTags> = this.route.queryParams.pipe(
    filter((qps) => qps.tag),
    map((qp) => qp.tag)
  );

  @HostBinding('class.bc-blog') baseClass = true;

  constructor(
    private scully: ScullyRoutesService,
    private scullyService: ScullyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.route.queryParams.pipe(filter((qp) => qp.tag)).subscribe((params) => {
    //   console.log(params); // { order: "popular" }
    // });
  }
}
