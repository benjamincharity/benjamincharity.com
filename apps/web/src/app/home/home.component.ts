import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { CanvasComponent, shuffle } from '../canvas/canvas.component';
import { Palette, PALETTES } from '../canvas/palettes.data';
import { createSVG } from '../squiggle';
import { COMPANIES } from './companies.data';
import { Link, NAVIGATION_LINKS } from './navigation.data';

export enum ArrowDirection {
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
}

@Component({
  selector: 'bc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  navigationLinks: ReadonlyArray<Link> = [...NAVIGATION_LINKS];
  palettes: ReadonlyArray<Palette> = [...PALETTES];
  companies: ReadonlyArray<string> = shuffle<string>([...COMPANIES]);

  @ViewChild(CanvasComponent)
  canvas?: CanvasComponent;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef
  ) {}

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
    console.log('setting color: ', color);
    this.document.documentElement.style.setProperty(
      `--highlight-color`,
      `${color}`
    );
    this.cdr.detectChanges();
  }
}
