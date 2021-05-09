import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ANIMATION_FRAME, WINDOW } from '@ng-web-apis/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, fromEvent, Observable } from 'rxjs';
import { combineAll, filter, takeUntil, tap } from 'rxjs/operators';

import { Palette } from './palettes.data';
import { Row } from './row';

export function shuffle<T = unknown>(arr: T[]): T[] {
  return arr.sort(() => Math.random() - 0.5);
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(n, max));
}

/**
 * Credit for wobble idea and original code to @neave: https://codepen.io/neave/details/yLNaLMw
 */
@UntilDestroy()
@Component({
  selector: 'bc-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'bcCanvas',
})
export class CanvasComponent implements AfterViewInit {
  private context: CanvasRenderingContext2D | null = null;
  private currentPalettes: Palette[] = [];
  private dist = 0;
  private mouseOff = -1000;
  private mouseX = this.mouseOff;
  private mouseY = this.mouseOff;
  private paletteNumber = 0;
  private scale: number = this.windowRef.devicePixelRatio || 1;
  private scale$ = new BehaviorSubject<number>(
    this.windowRef.devicePixelRatio ?? 1
  );
  private rows: Row[] = [];
  private totalPoints = 0;
  private windowResizeEvent$ = fromEvent(this.windowRef, 'resize').pipe(
    untilDestroyed(this),
    filter(() => !!this.canvas)
  );
  private destroy$ = new BehaviorSubject<void>(undefined);
  isPaused = false;

  @ViewChild('canvasRef') canvasRef?: ElementRef;
  get canvas(): HTMLCanvasElement {
    return this.canvasRef?.nativeElement;
  }

  @Input() palettes: ReadonlyArray<Palette> = [];
  @Input() isDisabled = false;

  @Output() readonly paletteChange = new EventEmitter<string>();

  constructor(
    @Inject(WINDOW) readonly windowRef: Window,
    @Inject(ANIMATION_FRAME)
    private readonly animationFrame$: Observable<number>
  ) {}

  ngAfterViewInit(): void {
    this.initialize(this.scale);
    this.windowResizeEvent$.subscribe(() => this.resizeRows());
    console.log('my log: ', this.palettes);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // TODO: add resize listener
  //   this.ngZone.runOutsideAngular(() => {
  //   this._resizeSubscription = fromEvent(window, 'resize')
  //     .pipe(
  //       debounceTime(200),
  //       distinctUntilChanged()
  //     )
  //     .subscribe(() => {
  //       this.ngZone.run(() => {
  //         this._redrawCanvasOnResize();
  //       });
  //     });
  // });

  // TODO: need a disable / clean up method
  private disable(): void {
    this.destroy$.next();
  }

  // TODO: If going this route I'll need type coercion for event stuff
  handleCanvasUserEvent(event: Event): void {
    switch (event.type) {
      case 'mousedown':
      case 'touchstart':
        break;
      case 'mousemove':
      case 'touchmove':
        // this.mouseX = event.targetTouches[0].pageX * scale;
        // this.mouseY = event.targetTouches[0].pageY * scale;
        break;
      case 'touchcancel':
      case 'mouseup':
      case 'touchend':
      case 'mouseout':
        break;
    }
  }

  // TODO: move some of this outside of zone?
  private initialize(scale: number): void {
    this.context = this.canvas.getContext('2d');
    fromEvent<TouchEvent>(this.canvas, 'ontouchmove').subscribe((e) =>
      console.log('new sub: ', e)
    );

    const onTouchMove$ = combineLatest([
      fromEvent<TouchEvent>(this.canvas, 'ontouchmove'),
      this.scale$,
    ])
      .pipe(
        // takeUntil(this.destroy$),
        tap(([event, scale]) => {
          console.log('INSIDE: ', event, scale);
          this.mouseX = event.targetTouches[0].pageX * scale;
          this.mouseY = event.targetTouches[0].pageY * scale;
        })
      )
      .subscribe((d) => console.log('DDDDDDDDDDDDDD', d));

    this.canvas.ontouchmove = (event: TouchEvent) => {
      console.log('INSIDE OLDDDDDD');
      this.mouseX = event.targetTouches[0].pageX * scale;
      this.mouseY = event.targetTouches[0].pageY * scale;
    };
    this.canvas.ontouchstart = (event: TouchEvent) => event.preventDefault();
    this.canvas.ontouchend = () => {
      this.wobbleRows();
      this.resetMousePositions();
    };

    const onMouseMove$ = combineLatest([
      fromEvent<MouseEvent>(this.canvas, 'onmousemove'),
      this.scale$,
    ])
      .pipe(
        // takeUntil(this.destroy$),
        tap(([event, scale]) => {
          console.log('INSIDE new onMouseMove$: ', event, scale);
          // this.mouseX = event.pageX * scale;
          // this.mouseY = event.pageY * scale;
        })
      )
      .subscribe((d) => console.log('in sub of onMouseMove$', d));
    this.canvas.onmousemove = (event: MouseEvent) => {
      console.log('in existing mouse move');
      this.mouseX = event.pageX * scale;
      this.mouseY = event.pageY * scale;
    };
    this.canvas.onmousedown = () => this.wobbleRows();
    this.canvas.onmouseleave = () => this.resetMousePositions();

    this.rows = [
      new Row(4 / 5, this.scale, this.totalPoints),
      new Row(3 / 5, this.scale, this.totalPoints),
      new Row(2 / 5, this.scale, this.totalPoints),
      new Row(1 / 5, this.scale, this.totalPoints),
    ];

    this.currentPalettes = [...this.palettes];
    this.setPalette();
    this.resizeRows();
    this.update();
  }

  private resizeRows(): void {
    this.canvas.width = innerWidth * this.scale;
    this.canvas.height = innerHeight * this.scale;
    this.canvas.style.width = innerWidth + 'px';
    this.canvas.style.height = innerHeight + 'px';
    this.totalPoints = Math.round(
      clamp(Math.pow(Math.random() * 8, 2), 16, innerWidth / 35)
    );
    this.dist = clamp(innerWidth / 4, 150, 200);

    for (let i = this.rows.length; i--; ) {
      this.rows[i].resize(this.totalPoints);
    }
    this.drawRows();
  }

  private wobbleRows() {
    this.resizeRows();
    for (let i = this.rows.length; i--; ) {
      this.rows[i].wobble(this.dist, this.totalPoints);
    }
    this.nextPalette();
  }

  private drawRows() {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = this.rows.length; i--; ) {
      this.rows[i].draw(
        this.canvas,
        this.dist,
        this.mouseX,
        this.mouseY,
        this.totalPoints
      );
    }
  }

  private setPalette() {
    const palette: Palette = this.currentPalettes[this.paletteNumber];
    this.paletteChange.emit(palette[0]);
    this.canvas.style.backgroundColor = palette[0];
    for (let i = this.rows.length; i--; ) {
      this.rows[this.rows.length - i - 1].color = palette[i + 1];
    }
  }

  private update() {
    if (!this.isPaused) {
      requestAnimationFrame(this.update.bind(this));
      this.drawRows();
    }
  }

  private resetMousePositions(): void {
    this.mouseX = this.mouseY = this.mouseOff;
  }

  // TODO: It would be nice to support a linear palette change
  nextPalette() {
    this.paletteNumber++;
    if (this.paletteNumber >= this.currentPalettes.length) {
      this.paletteNumber = 0;
      this.currentPalettes = shuffle<Palette>(this.currentPalettes);
    }
    console.log('nextPalette calling setPalette');
    this.setPalette();
  }

  togglePause(): void {
    this.isPaused = !this.isPaused;
    if (!this.isPaused) {
      this.update();
    }
  }
}
