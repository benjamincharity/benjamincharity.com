import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'bc-circled-link',
  templateUrl: './circled-link.component.html',
  styleUrls: ['./circled-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircledLinkComponent {
  @Input() routerLink: string | string[] = '';
  @Input() queryParams: Record<string, string> | undefined;
}
