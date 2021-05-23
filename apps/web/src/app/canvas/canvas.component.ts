import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  NgZone,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ANIMATION_FRAME, WINDOW } from '@ng-web-apis/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  Observable,
  Subject,
} from 'rxjs';
import {
  combineAll,
  distinctUntilChanged,
  filter,
  skip,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { Palette } from './palettes.data';
import { Row } from './row';

export enum ArrowDirection {
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
}

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
  private currentPalettes$ = new BehaviorSubject<ReadonlyArray<Palette>>([]);
  private dist = 0;
  private mouseOff = -1000;
  private mouseX = this.mouseOff;
  private mouseY = this.mouseOff;
  private paletteNumber = 0;
  private paletteNumber$ = new BehaviorSubject<number>(-1);
  private scale: number = this.windowRef.devicePixelRatio || 1;
  private scale$ = new BehaviorSubject<number>(
    this.windowRef.devicePixelRatio ?? 1
  );
  private rows: Row[] = [];
  private totalPoints = 0;
  private windowResizeEvent$ = fromEvent(this.windowRef, 'resize').pipe(
    distinctUntilChanged(),
    untilDestroyed(this)
  );
  private destroy$ = new Subject();
  isPaused = false;

  @HostBinding('class.bc-canvas') baseClass = true;
  @HostBinding('class.bc-canvas--faded') @Input() hasOpacity = false;
  @ViewChild('canvasRef') canvasRef?: ElementRef<HTMLCanvasElement>;

  get canvas(): HTMLCanvasElement | undefined {
    return this.canvasRef?.nativeElement;
  }

  @Input() palettes: ReadonlyArray<Palette> = [];
  @Input() isDisabled = false;

  @Output() readonly paletteChange = new EventEmitter<Palette>();

  constructor(
    @Inject(WINDOW) readonly windowRef: Window,
    @Inject(ANIMATION_FRAME)
    private readonly animationFrame$: Observable<number>,
    private ngZone: NgZone
  ) {}

  // mouseMoveListener$!: Observable<MouseEvent>;

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.initialize(this.canvas, this.scale);
    }
    this.windowResizeEvent$.subscribe(() => {
      console.log('window resizing');
      if (this.canvas) {
        this.resizeRows(this.canvas);
      }
    });
    // console.log('my log: ', this.palettes);
  }

  ngOnDestroy(): void {
    // this.destroy$.next();
    // this.destroy$.complete();
  }

  // TODO: need a disable / clean up method
  private disable(): void {
    console.warn('in disable');
    // this.destroy$.next();
  }

  private cleanUp(): void {}

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

  // TODO: move some of this outside of zone? Currently it's triggering change detection on every mouse move
  private initialize(canvas: HTMLCanvasElement, scale: number): void {
    this.context = canvas.getContext('2d');
    this.currentPalettes$.next(
      shuffle<Palette>([...this.palettes])
    );

    this.ngZone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(canvas, 'mousemove')
        .pipe(takeUntil(this.destroy$))
        .subscribe((event) => this.handleMove(event.pageX, event.pageY, scale));

      fromEvent<MouseEvent>(canvas, 'mousedown')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.wobbleRows(canvas));

      fromEvent<MouseEvent>(canvas, 'mouseleave')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.resetMousePositions());

      fromEvent<TouchEvent>(canvas, 'touchmove')
        .pipe(takeUntil(this.destroy$))
        .subscribe((event) =>
          this.handleMove(
            event.targetTouches[0].pageX,
            event.targetTouches[0].pageY,
            scale
          )
        );

      fromEvent<TouchEvent>(canvas, 'touchstart')
        .pipe(takeUntil(this.destroy$))
        .subscribe((event) => event.preventDefault());

      fromEvent<TouchEvent>(canvas, 'touchend')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.wobbleRows(canvas);
          this.resetMousePositions();
        });

      fromEvent<KeyboardEvent>(window, 'keyup')
        .pipe(takeUntil(this.destroy$))
        .subscribe((event) => {
          if (event.code === ArrowDirection.ARROW_LEFT) {
            this.previousPalette();
          }
          if (event.code === ArrowDirection.ARROW_RIGHT) {
            this.nextPalette();
          }
        });

      combineLatest([this.paletteNumber$, this.currentPalettes$])
        .pipe(skip(1), takeUntil(this.destroy$))
        .subscribe(([newNumber, palettes]) =>
          this.setPalette(palettes, newNumber)
        );
    });

    this.rows = [
      new Row(4 / 5, this.scale, this.totalPoints),
      new Row(3 / 5, this.scale, this.totalPoints),
      new Row(2 / 5, this.scale, this.totalPoints),
      new Row(1 / 5, this.scale, this.totalPoints),
    ];

    this.paletteNumber$.next(0);
    this.resizeRows(canvas);
    this.update();
  }

  private handleMove(x: number, y: number, scale: number): void {
    this.mouseX = x * scale;
    this.mouseY = y * scale;
  }

  private resizeRows(canvas: HTMLCanvasElement): void {
    const currentHeight = this.windowRef.innerHeight;
    const currentWidth = this.windowRef.innerWidth;
    canvas.width = currentWidth * this.scale;
    canvas.height = currentHeight * this.scale;
    canvas.style.width = `${currentWidth}px`;
    canvas.style.height = `${currentHeight}px`;
    this.totalPoints = Math.round(
      clamp(Math.pow(Math.random() * 8, 2), 16, currentWidth / 35)
    );
    this.dist = clamp(currentWidth / 4, 150, 200);

    for (let i = this.rows.length; i--; ) {
      this.rows[i].resize(this.totalPoints);
    }
    this.drawRows(canvas);
  }

  private wobbleRows(canvas: HTMLCanvasElement) {
    this.resizeRows(canvas);
    for (let i = this.rows.length; i--; ) {
      this.rows[i].wobble(this.dist, this.totalPoints);
    }
    this.nextPalette();
  }

  private drawRows(canvas: HTMLCanvasElement) {
    this.context?.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = this.rows.length; i--; ) {
      this.rows[i].draw(
        canvas,
        this.dist,
        this.mouseX,
        this.mouseY,
        this.totalPoints
      );
    }
  }

  private setPalette(
    palettes: ReadonlyArray<Palette>,
    paletteNumber = 0
  ): void {
    // console.log('in setPalette: palettes: ', palettes);
    if (this.canvas) {
      const palette: Palette = palettes[paletteNumber];
      this.paletteChange.emit(palette);
      this.canvas.style.backgroundColor = palette[0];
      for (let i = this.rows.length; i--; ) {
        this.rows[this.rows.length - i - 1].color = palette[i + 1];
      }
    }
  }

  private update() {
    if (!this.isPaused) {
      requestAnimationFrame(this.update.bind(this));
      if (this.canvas) {
        this.drawRows(this.canvas);
      }
    }
  }

  private resetMousePositions(): void {
    this.mouseX = this.mouseY = this.mouseOff;
  }

  previousPalette(): void {
    const unvalidatedNumber = this.paletteNumber$.getValue() - 1;
    const validatedNumber =
      unvalidatedNumber < 0 ? this.palettes.length : unvalidatedNumber;
    this.paletteNumber$.next(validatedNumber);
  }

  nextPalette(): void {
    const unvalidatedNumber = this.paletteNumber$.getValue() + 1;
    const validatedNumber =
      unvalidatedNumber > this.palettes.length - 1 ? 0 : unvalidatedNumber;
    this.paletteNumber$.next(validatedNumber);
  }

  togglePause(): void {
    this.isPaused = !this.isPaused;
    if (!this.isPaused) {
      this.update();
    }
  }
}
