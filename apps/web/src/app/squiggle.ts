/**
 * Credit for Squiggle idea and original code to @geoffgraham: https://codepen.io/geoffgraham/pen/bxEVEN
 */
export function createSVG(color: string): string {
  // eslint-disable-next-line max-len
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 4"><style type="text/css">.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}</style><path fill="none" stroke="${color}" stroke-width="2" class="squiggle" d="M0 3.5c5 0 5-3 10-3s5 3 10 3c5 0 5-3 10-3s5 3 10 3"/></svg>`;
}
