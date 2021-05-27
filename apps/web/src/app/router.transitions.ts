import {
  trigger,
  animate,
  style,
  group,
  query as q,
  transition,
  AnimationStyleMetadata,
  AnimationAnimateMetadata,
  stagger,
} from '@angular/animations';

export enum TransitionNames {
  BACKWARD = 'backward',
  FORWARD = 'forward',
  INITIAL = 'initial',
  NONE = 'none',
  SECTION = 'section',
}

const query = (
  style: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animate: any,
  optional = { optional: true }
) => q(style, animate, optional);

// const DURATION = 0.3;
const DURATION = 400;
const EASING = 'cubic-bezier(.51,.84,.84,1.03)';
const DISTANCE = 30;

// const fade = [
//   query(':enter, :leave', style({ position: 'fixed', width: '100%' })),
//   query(':enter', [style({ opacity: 0 })]),
//   group([
//     query(':leave', [animate(`${DURATION}s ease-out`, style({ opacity: 0 }))]),
//     query(':enter', [
//       style({ opacity: 0 }),
//       animate(`${DURATION}s ease-out`, style({ opacity: 1 })),
//     ]),
//   ]),
// ];
//
// const fadeInFromDirection = (
//   direction: TransitionNames.FORWARD | TransitionNames.BACKWARD
// ) => [
//   query(':enter, :leave', style({ position: 'fixed', width: '100%' })),
//   group([
//     query(':enter', [
//       style({
//         transform: `translateX(${direction === 'backward' ? '-' : ''}15%)`,
//         opacity: 0,
//       }),
//       animate(
//         `${DURATION}s ease-out`,
//         style({ transform: 'translateX(0%)', opacity: 1 })
//       ),
//     ]),
//     query(':leave', [
//       style({ transform: 'translateX(0%)' }),
//       animate(`${DURATION}s ease-out`, style({ opacity: 0 })),
//     ]),
//   ]),
// ];

// export const routerTransition = trigger('routerTransition', [
//   transition('* => initial', fade),
//   transition('* => section', fade),
//   transition('* => forward', fadeInFromDirection(TransitionNames.FORWARD)),
//   transition('* => backward', fadeInFromDirection(TransitionNames.BACKWARD)),
// ]);

export const homeTransitions = trigger('pageAnimations', [
  transition(':enter', [
    group([
      query('h1', [
        style({ opacity: 0, transform: `translateY(-${DISTANCE}px)` }),
        animate(
          `${DURATION}ms ${EASING}`,
          style({ opacity: 1, transform: 'none' })
        ),
      ]),
      query('.home-animation-item', [
        style({ opacity: 0, transform: `translateY(${DISTANCE}px)` }),
        stagger(100, [
          animate(
            `${DURATION}ms ${EASING}`,
            style({ opacity: 1, transform: 'none' })
          ),
        ]),
      ]),
      // query('router-outlet + *', [
      //   style({ opacity: 0, transform: `translateY(${DISTANCE}px)` }),
      //   animate(
      //     `${DURATION * 6}ms ${EASING}`,
      //     style({ opacity: 1, transform: 'none' })
      //   ),
      // ]),
    ]),
  ]),
  transition(':leave', [
    group([
      query('h1', [
        style({ opacity: 1, transform: 'none' }),
        animate(
          `${DURATION}ms ${EASING}`,
          style({ opacity: 0, transform: `translateY(-${DISTANCE}px)` })
        ),
      ]),
      query('.home-animation-item', [
        style({ opacity: 1, transform: 'none' }),
        stagger(60, [
          animate(
            `${DURATION}ms ${EASING}`,
            style({ opacity: 0, transform: `translateY(${DISTANCE}px)` })
          ),
        ]),
      ]),
      // query('router-outlet + *', [
      //   style({ opacity: 0, transform: `translateY(${DISTANCE}px)` }),
      //   animate(
      //     `${DURATION * 6}ms ${EASING}`,
      //     style({ opacity: 1, transform: 'none' })
      //   ),
      // ]),
    ]),
  ]),
]);

export const fader =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('routeAnimations', [
    // route transition specifically for aPage to bPage
    transition('home => blog', [
      // css styles at start of transition
      style({ opacity: 0 }),
      // animation and styles at end of transition
      animate('400ms ease', style({ opacity: 1 })),
    ]),
    // route transition for * (any) to and from * (any)
    transition('* <=> *', [
      // css styles at start of transition
      style({ opacity: 0 }),
      // animation and styles at end of transition
      animate('600ms ease', style({ opacity: 1 })),
    ]),
  ]);
