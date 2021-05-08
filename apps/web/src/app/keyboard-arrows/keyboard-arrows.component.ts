import { Component, Input } from '@angular/core';

@Component({
  selector: 'bc-keyboard-arrows',
  templateUrl: './keyboard-arrows.component.svg',
  styleUrls: ['./keyboard-arrows.component.css'],
})
export class KeyboardArrowsComponent {
  @Input() showKeyboard = false;
}
