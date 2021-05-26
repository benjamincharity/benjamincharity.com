import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import {
  bounceInLeftOnEnterAnimation,
  rotateOutDownRightOnLeaveAnimation,
} from 'angular-animations';
import { BehaviorSubject, timer } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';

import { coerceRouteData, BcPageNames } from './app-routing.module';
import { CanvasComponent } from './canvas/canvas.component';
import { Palette, PALETTES } from './canvas/palettes.data';
import { fader, homeTransitions, TransitionNames } from './router.transitions';
import { createSVG } from './squiggle';
import { BC_WINDOW } from './window.service';

const DEFAULT_KEYBOARD_DELAY = 7000;

@Component({
  selector: 'bc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // routerTransition,
    // TODO: this is working - need to figure out best animations
    // Initial load: page fades in, title down and in
    // To next page: title scales down and moves up, next page slides/fades in
    homeTransitions,
    fader,
    rotateOutDownRightOnLeaveAnimation(),
    bounceInLeftOnEnterAnimation(),
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  palettes: ReadonlyArray<Palette> = [...PALETTES];
  showKeyboard = true;
  showKeyboard$ = new BehaviorSubject<boolean>(false);
  mediaQuery = this.window.matchMedia('(prefers-reduced-motion: reduce)');
  backgroundIsActive$ = new BehaviorSubject<boolean>(true);
  shouldFadeBackground = false;
  shouldMinimizeSiteTitle = false;
  currentRouteLength = 0;
  set currentRoute(value: string) {
    this._currentRoute = value ?? '';
    // TODO: clean up
    this.currentRouteLength = this._currentRoute.length;
    this.shouldFadeBackground = this._currentRoute.length > 2;
    this.shouldMinimizeSiteTitle = this._currentRoute.length > 2;
  }
  get currentRoute(): string {
    return this._currentRoute;
  }
  private _currentRoute = '';
  private previousPath = '';

  @ViewChild(CanvasComponent)
  canvas?: CanvasComponent;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(BC_WINDOW) private window: Window,
    private router: Router
  ) {}

  ngOnInit(): void {
    timer(DEFAULT_KEYBOARD_DELAY)
      .pipe(
        tap(() => {
          if (!this.currentRoute.includes('blog')) {
            this.showKeyboard$.next(true);
          }
        }),
        delay(4000),
        tap(() => this.showKeyboard$.next(false))
      )
      .subscribe();

    // TODO: verify this is wired up correctly
    this.mediaQuery.addEventListener('change', () => {
      const shouldBeActive = !(
        this.mediaQuery.media.includes('reduce') && this.mediaQuery.matches
      );
      // console.log('reduce: animation should be active: ', shouldBeActive);
      this.backgroundIsActive$.next(shouldBeActive);
    });

    this.router.events
      .pipe(
        // filter(
        //   (event): event is NavigationEnd => event instanceof NavigationEnd
        // ),
        filter(
          (event): event is NavigationStart => event instanceof NavigationStart
        )
      )
      .subscribe((event) => {
        // console.log(event);
        this.currentRoute = event.url ?? '';
      });
  }

  paletteChange(palette: Palette): void {
    // console.log('app got palette change, setting doc: ', palette);
    this.document.documentElement.style.setProperty(
      `--animatedLink-backgroundImage`,
      `url(data:image/svg+xml;base64,${window.btoa(createSVG(palette[0]))})`
    );
    this.document.documentElement.style.setProperty(
      `--highlight-color`,
      `${palette[0]}`
    );
    this.document.documentElement.style.setProperty(
      `--highlight-color-2`,
      `${palette[1]}`
    );
  }

  // TODO: change to static property for performance
  getPageTransition(routerOutlet: RouterOutlet): TransitionNames | undefined {
    if (
      routerOutlet &&
      routerOutlet.isActivated &&
      routerOutlet.activatedRoute?.routeConfig
    ) {
      let transitionName: TransitionNames = TransitionNames.SECTION;
      const path = this.router.routerState.snapshot.url;
      // console.warn('getPageTransition: path: ', path);
      // console.warn('getPageTransition: previousPath: ', this.previousPath);

      const isSame = this.previousPath === path;
      const isBackward = path && this.previousPath.startsWith(path);
      const isForward = path && path.startsWith(this.previousPath);
      // console.log('getPageTransition: isSame: ', isSame);

      if (isSame) {
        transitionName = TransitionNames.NONE;
      } else if (isBackward && isForward) {
        transitionName = TransitionNames.INITIAL;
      } else if (isBackward) {
        transitionName = TransitionNames.BACKWARD;
      } else if (isForward) {
        transitionName = TransitionNames.FORWARD;
      }

      this.previousPath = path;
      // console.log('getPageTransition: ', transitionName);
      return transitionName;
    }
  }

  determineOutletAnimation(outlet: RouterOutlet): BcPageNames {
    if (coerceRouteData(outlet.activatedRouteData)) {
      return outlet.activatedRouteData.animation;
    }
    return BcPageNames.HOME;
  }
}
