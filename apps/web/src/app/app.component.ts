import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { of, timer } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';

import { CanvasComponent } from './canvas/canvas.component';
import { Palette, PALETTES } from './canvas/palettes.data';
import { Link, NAVIGATION_LINKS } from './home/navigation.data';
import { createSVG } from './squiggle';

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
export class AppComponent {
  navigationLinks: ReadonlyArray<Link> = [...NAVIGATION_LINKS];
  palettes: ReadonlyArray<Palette> = [...PALETTES];
  showKeyboard$ = of(true).pipe(
    startWith(false),
    delay(DEFAULT_KEYBOARD_DELAY)
  );

  @ViewChild(CanvasComponent)
  canvas?: CanvasComponent;

  constructor(@Inject(DOCUMENT) private document: Document) {}

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
      `--link-backgroundImage`,
      `url(data:image/svg+xml;base64,${window.btoa(createSVG(color))})`
    );
    this.document.documentElement.style.setProperty(
      `--highlight-color`,
      `${color}`
    );
  }
}
