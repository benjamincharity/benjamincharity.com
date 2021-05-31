import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {
  bounceInRightOnEnterAnimation,
  fadeInDownOnEnterAnimation,
  rotateOutDownRightOnLeaveAnimation,
} from 'angular-animations';
import { BehaviorSubject, timer } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';

import { CanvasComponent } from './canvas/canvas.component';
import { Palette, PALETTES } from './canvas/palettes.data';
import { shrinkHeaderAnimation } from './shared/animation.constants';
import { createSVG } from './squiggle';
import { BC_WINDOW } from './window.service';

const DEFAULT_INFO_INTRO_DELAY = 7000;
const DEFAULT_INFO_EXIT_DELAY = DEFAULT_INFO_INTRO_DELAY * 2;

export enum LogoStates {
  VOID = 'void',
  DEFAULT = 'default',
  SHRUNK = 'shrunk',
}

export type LogoState = keyof typeof LogoStates;

@Component({
  selector: 'bc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeInDownOnEnterAnimation({
      duration: 800,
      translate: '1.6rem',
    }),
    shrinkHeaderAnimation,
    bounceInRightOnEnterAnimation(),
    rotateOutDownRightOnLeaveAnimation(),
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  palettes: ReadonlyArray<Palette> = [...PALETTES];
  logoState$ = new BehaviorSubject<LogoStates>(LogoStates.VOID);
  showKeyboard = true;
  showKeyboard$ = new BehaviorSubject<boolean>(false);
  showInfo$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showCanvas$ = new BehaviorSubject<boolean>(false);
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

  @ViewChild(CanvasComponent)
  canvas?: CanvasComponent;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(BC_WINDOW) private window: Window,
    private router: Router,
  ) {}

  ngOnInit(): void {
    timer(240)
      .pipe(filter(() => this.router.url.length < 2))
      .subscribe(() => this.showCanvas$.next(true));
    timer(DEFAULT_INFO_INTRO_DELAY)
      .pipe(
        filter(() => !(this.currentRoute.length > 2)),
        tap(() => this.showInfo$.next(true)),
        delay(DEFAULT_INFO_EXIT_DELAY),
        tap(() => this.showInfo$.next(false)),
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
        filter(
          (event): event is NavigationStart => event instanceof NavigationStart,
        ),
        tap((event) => {
          // console.log('route event: ', event);
          this.currentRoute = event.url ?? '';
          const isHomePage = event.url.length < 2;
          this.logoState$.next(
            isHomePage ? LogoStates.DEFAULT : LogoStates.SHRUNK,
          );
          this.showCanvas$.next(isHomePage);
        }),
      )
      .subscribe();
  }

  paletteChange(palette: Palette): void {
    // console.log('app got palette change, setting doc: ', palette);
    this.document.documentElement.style.setProperty(
      `--o-squiggle-link-backgroundImage`,
      `url(data:image/svg+xml;base64,${window.btoa(createSVG(palette[0]))})`,
    );

    for (let i = 0; i < palette.length; i += 1) {
      const cssVar = `--highlight-color-${i + 1}`;
      this.document.documentElement.style.setProperty(cssVar, `${palette[i]}`);
    }
  }
}
