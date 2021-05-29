import { state, transition, trigger, useAnimation } from '@angular/animations';
import { animate, animation, keyframes, style } from '@angular/animations';

export const fadeUpDelay = 80;
export const fadeUpDuration = 800;
export const fadeUpDistance = '26px';

export const shrinkHeader = animation(
  animate(
    '{{ timing }}s {{ delay }}s cubic-bezier(0.6, 0.72, 0, 1)',
    keyframes([
      style({
        offset: 0,
      }),
      style({
        fontSize: '32px',
        offset: 1,
      }),
    ]),
  ),
  { params: { timing: 400, delay: 0 } },
);
export const growHeader = animation(
  animate(
    '{{ timing }}s {{ delay }}s cubic-bezier(0.6, 0.72, 0, 1)',
    keyframes([
      style({
        fontSize: '32px',
        offset: 0.3,
      }),
      style({
        fontSize: '96px',
        offset: 1,
      }),
    ]),
  ),
  { params: { timing: 400, delay: 0 } },
);

const fadeInDown = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          transform: 'translate3d(0, -{{translate}}, 0)',
          easing: 'ease',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          easing: 'ease',
          offset: 1,
        }),
      ]),
    ),
  ]);

export const shrinkHeaderAnimation = trigger('shrink', [
  state(
    'void',
    style({
      // color: '#fff',
      // fontSize: '60px',
      // opacity: 0,
      // transform: 'translateY(-26px)',
      transform: 'translate3d(0, -26px, 0)',
    }),
  ),
  state(
    'default',
    style({
      // color: '#fff',
      // fontSize: '96px',
      // opacity: 1,
      // transform: 'scale(1.6)',
      transform: 'translate3d(0, 0, 0)',
    }),
  ),
  state(
    'shrunk',
    style({
      // color: '#444',
      // fontSize: '32px',
      // opacity: 1,
      transform: 'scale(.4) translate3d(0, -140px, 0)',
    }),
  ),
  transition('void => shrunk', animate('30ms ease-out')),
  transition('void => default', animate('300ms ease-out')),
  transition('default => shrunk', animate('300ms ease-out')),
  transition('shrunk => default', animate('300ms ease-out')),
  // transition('* => *', animate('300ms ease-out')),
  // transition(
  //   'void => *',
  //   useAnimation(shrinkHeader, {
  //     params: { timing: 0.7 },
  //   }),
  // ),
  // transition(
  //   '* => void',
  //   useAnimation(growHeader, {
  //     params: { timing: 0.6 },
  //   }),
  // ),
]);
