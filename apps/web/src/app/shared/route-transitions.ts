// export const home = trigger('pageAnimations', [
//   transition(':enter', [
//     group([
//       // query('h1', [
//       //   style({ opacity: 0, transform: `translateY(-${DISTANCE}px)` }),
//       //   animate(
//       //     `${DURATION}ms ${EASING}`,
//       //     style({ opacity: 1, transform: 'none' })
//       //   ),
//       // ]),
//       query('.home-animation-item', [
//         style({ opacity: 0, transform: `translateY(${DISTANCE}px)` }),
//         stagger(100, [
//           animate(
//             `${DURATION}ms ${EASING}`,
//             style({ opacity: 1, transform: 'none' }),
//           ),
//         ]),
//       ]),
//       // query('router-outlet + *', [
//       //   style({ opacity: 0, transform: `translateY(${DISTANCE}px)` }),
//       //   animate(
//       //     `${DURATION * 6}ms ${EASING}`,
//       //     style({ opacity: 1, transform: 'none' })
//       //   ),
//       // ]),
//     ]),
//   ]),
//   transition(':leave', [
//     group([
//       // query('h1', [
//       //   style({ opacity: 1, transform: 'none' }),
//       //   animate(
//       //     `${DURATION}ms ${EASING}`,
//       //     style({ opacity: 0, transform: `translateY(-${DISTANCE}px)` }),
//       //   ),
//       // ]),
//       query('.home-animation-item', [
//         style({ opacity: 1, transform: 'none' }),
//         stagger(60, [
//           animate(
//             `${DURATION}ms ${EASING}`,
//             style({ opacity: 0, transform: `translateY(${DISTANCE}px)` }),
//           ),
//         ]),
//       ]),
//       // query('router-outlet + *', [
//       //   style({ opacity: 0, transform: `translateY(${DISTANCE}px)` }),
//       //   animate(
//       //     `${DURATION * 6}ms ${EASING}`,
//       //     style({ opacity: 1, transform: 'none' })
//       //   ),
//       // ]),
//     ]),
//   ]),
// ]);
