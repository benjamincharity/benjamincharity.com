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
import { delay } from 'rxjs/operators';

import { CanvasComponent } from './canvas/canvas.component';
import { Palette, PALETTES } from './canvas/palettes.data';
import { Link, NAVIGATION_LINKS } from './home/navigation.data';
import { createSVG } from './squiggle';

export enum ArrowDirection {
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
}

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
  showKeyboard$ = of(true).pipe(delay(7000));

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
    this.document.documentElement.style.setProperty(
      `--link-backgroundImage`,
      `url(data:image/svg+xml;base64,${window.btoa(createSVG(color))})`
    );
    this.document.documentElement.style.setProperty(`--underline`, `${color}`);
  }
}
