import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

import { CanvasComponent } from './canvas/canvas.component';
import { Palette, PALETTES } from './canvas/palettes.data';
import { createSVG } from './squiggle';
import { BC_WINDOW } from './window.service';

export enum ArrowDirection {
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
}

const DEFAULT_KEYBOARD_DELAY = 7000;

@Component({
  selector: 'bc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  palettes: ReadonlyArray<Palette> = [...PALETTES];
  showKeyboard = true;
  showKeyboard$ = new BehaviorSubject<boolean>(false);
  mediaQuery = this.window.matchMedia('(prefers-reduced-motion: reduce)');
  backgroundIsActive$ = new BehaviorSubject<boolean>(true);

  @ViewChild(CanvasComponent)
  canvas?: CanvasComponent;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(BC_WINDOW) private window: Window
  ) {}

  ngOnInit(): void {
    // TODO: should not show when on blog pages
    timer(DEFAULT_KEYBOARD_DELAY).subscribe(() =>
      this.showKeyboard$.next(true)
    );

    this.mediaQuery.addEventListener('change', () => {
      const shouldBeActive = !(
        this.mediaQuery.media.includes('reduce') && this.mediaQuery.matches
      );
      console.log('reduce: animation should be active: ', shouldBeActive);
      this.backgroundIsActive$.next(shouldBeActive);
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (
      event.code === ArrowDirection.ARROW_LEFT ||
      event.code === ArrowDirection.ARROW_RIGHT
    ) {
      this.canvas?.nextPalette();
    }
  }

  paletteChange(color: string): void {
    console.log('app got palette change, setting doc: ', color);
    this.document.documentElement.style.setProperty(
      `--animatedLink-backgroundImage`,
      `url(data:image/svg+xml;base64,${window.btoa(createSVG(color))})`
    );
    this.document.documentElement.style.setProperty(
      `--highlight-color`,
      `${color}`
    );
  }
}
